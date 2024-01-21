import { Schema, model, Document } from "mongoose"

const hackathonSchema = new Schema(
	{
		title: { type: String, required: true },
		thumbnail: { type: String, required: false },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		organizers: { type: String, required: false },
		participants: { type: Number, required: false },
		location: { type: String },
		prizes: {
			prize_amount: { type: Number },
			prize_currency: { type: String },
		},
		registrationDeadline: { type: Date },
		registrationLink: { type: String },
		tags: [{ type: String }],
	},
	{
		timestamps: true,
	}
)

const Hackathon = model("Hackathon", hackathonSchema)
export default Hackathon

interface HackathonPrize {
	prize_amount: number
	prize_currency: string
}

export interface HackathonDocument extends Document {
	title: string
	thumbnail?: string
	startDate: Date
	endDate: Date
	organizers?: string
	participants?: number
	location?: string
	prizes?: HackathonPrize
	registrationDeadline?: Date
	registrationLink?: string
	tags?: string[]
}
