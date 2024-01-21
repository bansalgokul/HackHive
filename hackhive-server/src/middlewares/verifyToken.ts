import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import User, { UserDocument } from "../models/user.model"

export const verifyTokenCookie = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.cookies.token

		if (!token) {
			return res.status(401).json({ error: "No token found" })
		}

		const secretKey = `${process.env.JWT_SECRET_KEY}`
		jwt.verify(token, secretKey, async (err: any, decoded: any) => {
			if (err) {
				return res
					.status(401)
					.json({ error: "Failed to authenticate token" })
			}

			const userId = decoded.userId
			const user: UserDocument | null = await User.findById(userId)

			if (!user) {
				return res.status(404).json({ error: "User not found" })
			}

			// Hydrate req.user with the authenticated user
			req.body.user = user._id
			next()
		})
	} catch (error) {
		console.error("Error verifying token:", error)
		res.status(500).json({ error: "Token verification failed" })
	}
}
