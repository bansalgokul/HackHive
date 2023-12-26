import { Schema, model, Document, Types } from "mongoose"

export interface TeamJoinApplication {
	applicant: Types.ObjectId
	message?: string
	status: "pending" | "accepted" | "rejected"
	githubLink?: string
	portfolioLink?: string
	resumePdf?: string // Reference to a resume PDF (file path, URL, or storage reference)
}

export interface TeamDocument extends Document {
	name: string
	description?: string
	memberLimit: number
	requiredRoles: string[]
	hackathon: {
		listedHackathon: { type: Schema.Types.ObjectId; ref: "Hackathon" }
		customHackathon?: string
	}
	members: Types.Array<Types.ObjectId>
	joinApplications: Types.Array<TeamJoinApplication>
}

const teamSchema = new Schema<TeamDocument>(
	{
		name: { type: String, required: true },
		description: { type: String },
		memberLimit: { type: Number, default: 4 },
		requiredRoles: [{ type: String }],
		hackathon: {
			listedHackathon: {
				type: Schema.Types.ObjectId,
				ref: "Hackathon",
				required: false,
			},
			customHackathon: {
				type: String,
				required: function () {
					// Require custom hackathon name if listedHackathon is not provided
					return !this.hackathon.listedHackathon
				},
			},
		},
		members: [{ type: Schema.Types.ObjectId, ref: "User" }],
		joinApplications: [
			{
				applicant: {
					type: Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				message: { type: String },
				status: {
					type: String,
					enum: ["pending", "accepted", "rejected"],
					default: "pending",
				},
				githubLink: { type: String },
				portfolioLink: { type: String },
				resumePdf: { type: String }, // Reference to a resume PDF
			},
		],
	},
	{
		timestamps: true,
	}
)

const Team = model<TeamDocument>("Team", teamSchema)

export default Team
