import mongoose from "mongoose"

export interface UserDocument extends mongoose.Document {
	email: string
	picture: string
	name: string
	phone: string
	// Social Media Links
	socialMedia: {
		linkedin: string
		twitter: string
		github: string
		// other social media platforms
	}
	// Additional Details
	interests: string[]
	skills: string[]
	education: {
		institution: string
		degree: string
		fieldOfStudy: string
	}[]
	employment: {
		company: string
		position: string
		// start and end date
		// location: string
		// description: string
		// responsibilities: string[]
		// achievements: string[]
		// skills: string[]
		// projects: string[]
	}
	resumePdf: string
	portfolio: string
	bio: string
}

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		required: true,
	},
	phone: { type: String },
	// Social Media Links
	socialMedia: {
		linkedin: { type: String },
		twitter: { type: String },
		github: { type: String },
		// other social media platforms
	},
	// Additional Details
	interests: [{ type: String }], // Array of user interests
	skills: [{ type: String }], // Array of user skills
	education: [
		{
			institution: { type: String },
			degree: { type: String },
			fieldOfStudy: { type: String },
		},
	],
	employment: [
		{
			company: { type: String },
			position: { type: String },
		},
	],
	resumePdf: { type: String },
	portfolio: { type: String },
	bio: { type: String },
})

export default mongoose.model<UserDocument>("User", UserSchema)
