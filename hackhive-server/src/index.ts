import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
require("dotenv").config()

import indexRouter from "./routers/index.route"

// Create an Express application
const app = express()

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI || "")
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", () => {
	console.log("Connected to MongoDB")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api", indexRouter)

// Start the Express server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

// user type
// access_token: "ya29.a0AfB_byDw_ke6l77MWJU3Ks2zlS7_t_o01d6_rPGlWSaQc9wTObhSFK8QnEFIaayR2vOXJwaAkgsnmP1OX3Mj8iNfijEFC2tvN61jGXHvhGYE5XAiurqEC99Q3ag8qxc7cIcPDttw_CgfOSfzu_1C8DekmSZjhL0nd60aCgYKAfYSARMSFQHGX2MiFtKTnj4cPLXs2Fpjqo3cew0170"
// authuser: "0"
// expires_in: 3599
// prompt: "none"
// scope: "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email"
// token_type: "Bearer"

// profile type
// email: "bansalgokul134@gmail.com"
// family_name: "Bansal"
// given_name: "Gokul"
// id: "116076945458908175500"
// locale: "en-GB"
// name: "Gokul Bansal"
// picture: "https://lh3.googleusercontent.com/a/ACg8ocKikLvp9WbqLV0iDAluWGww6DBUt4MpD1E5wUDt7GjX=s96-c"
// verified_email: true
