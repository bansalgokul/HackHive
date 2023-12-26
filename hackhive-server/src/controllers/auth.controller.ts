import { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import User from "../models/user.model"
import jwt from "jsonwebtoken"

const googleClient = new OAuth2Client({
	clientId: `${process.env.GOOGLE_CLIENT_ID}`,
})

export const authenticateUser = async (req: Request, res: Response) => {
	const { token } = req.body
	const ticket = await googleClient.verifyIdToken({
		idToken: token,
		audience: `${process.env.GOOGLE_CLIENT_ID}`,
	})

	const payload = ticket.getPayload()
	if (!payload) {
		return res.status(400).json({ error: "Invalid token" })
	}
	console.log("payload : ", payload)
	let user = await User.findOne({ email: payload?.email })
	if (!user) {
		const newUser = new User({
			email: payload.email,
			picture: payload.picture || "",
			name: payload.name || "",
		})
		user = await newUser.save()
	}

	const secretKey = `${process.env.JWT_SECRET_KEY}`
	const jwttoken = jwt.sign({ userId: user._id }, secretKey, {
		expiresIn: "1d",
	})

	// Set the token as an HTTP cookie
	res.cookie("token", jwttoken, {
		httpOnly: true,
		maxAge: 10 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
	})

	res.json({ user })
}
