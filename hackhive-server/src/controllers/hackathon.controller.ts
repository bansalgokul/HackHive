import { Request, Response } from "express"
import Hackathon, { HackathonDocument } from "../models/hackathon.model"

type GetQuery = {
	search?: string
	page?: string
	perPage?: string
	sortField?: string
	sortOrder?: string
	location?: string
	startDate?: string
	endDate?: string
	status?: string
	minParticipants?: string
	maxParticipants?: string
	minPrizeAmount?: string
	maxPrizeAmount?: string
}

interface HackathonData {
	totalCount: { totalCount: number }[]
	paginatedData: HackathonDocument[]
}

const getHackathons = async (req: Request, res: Response) => {
	try {
		let {
			search,
			page = "1",
			perPage = "10",
			sortField = "startDate",
			sortOrder = "asc",
			location,
			startDate,
			endDate,
			status,
			minParticipants,
			maxParticipants,
			minPrizeAmount,
			maxPrizeAmount,
		}: GetQuery = req.query

		// Building the match conditions for the aggregation pipeline
		const match: any = {}
		if (search) {
			const regex = new RegExp(search, "i")
			match.$or = [{ title: regex }, { organizers: regex }]
		}
		if (location) match.location = location
		if (startDate) match.startDate = { $gte: new Date(startDate) }
		if (endDate) match.endDate = { $lte: new Date(endDate) }
		if (status) {
			const currentDate = new Date()
			if (status === "open") {
				match.startDate = { $lte: currentDate }
				match.endDate = { $gte: currentDate }
			} else if (status === "closed") {
				match.endDate = { $lt: currentDate }
			}
		}
		if (minParticipants || maxParticipants) {
			match.participants = {}
			if (minParticipants)
				match.participants.$gte = parseInt(minParticipants)
			if (maxParticipants)
				match.participants.$lte = parseInt(maxParticipants)
		}
		if (minPrizeAmount || maxPrizeAmount) {
			match["prizes.prize_amount"] = {}
			if (minPrizeAmount)
				match["prizes.prize_amount"].$gte = parseInt(minPrizeAmount)
			if (maxPrizeAmount)
				match["prizes.prize_amount"].$lte = parseInt(maxPrizeAmount)
		}

		// Convert sortOrder to 1 for ascending, -1 for descending
		const sort: any = {}
		sort[sortField] = sortOrder === "asc" ? 1 : -1

		// Pagination calculations
		const skip = (parseInt(page) - 1) * parseInt(perPage)
		const limit = parseInt(perPage)

		const countPipeline = [{ $match: match }, { $count: "totalCount" }]

		const paginationPipeline = [
			{ $match: match },
			{ $sort: sort },
			{ $skip: skip },
			{ $limit: limit },
		]

		const aggregationPipeline = [
			{
				$facet: {
					totalCount: countPipeline,
					paginatedData: paginationPipeline,
				},
			},
		]

		const result: HackathonData[] = await Hackathon.aggregate(
			aggregationPipeline
		)

		const totalCount =
			result[0].totalCount.length > 0
				? result[0].totalCount[0].totalCount
				: 0
		const paginatedData: HackathonDocument[] = result[0].paginatedData

		const response = {
			totalCount,
			data: paginatedData,
		}

		res.status(200).json(response)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				message: "Error fetching hackathons",
				error: error.message,
			})
		} else {
			res.status(500).json({
				message: "Unknown error fetching hackathons",
			})
		}
	}
}

export { getHackathons }
