import { Types } from "mongoose"
import Team, { TeamDocument } from "../models/team.model"
import { Response, Request, NextFunction } from "express"

// Helper function for handling server errors
const handleServerError = (res: Response, error: any) => {
	console.error("Error:", error)
	return res.status(500).json({ message: "Internal Server Error" })
}

// Helper function for handling not found errors
const handleNotFound = (res: Response, message: string = "Not Found") => {
	return res.status(404).json({ message })
}

// Middleware to verify if the user is the leader of the team
export const verifyTeamLeader = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { teamID } = req.body
		const userID = req.body.user

		const team = await Team.findById(teamID)

		if (!team) {
			return handleNotFound(res, "Team Not Found")
		}

		if (team.createdBy !== userID.toString()) {
			return res.status(403).json({
				message:
					"User is not the leader of the team. Only the leader can perform this action.",
			})
		}

		req.body.team = team as TeamDocument
		next()
	} catch (err) {
		return handleServerError(res, err)
	}
}

type TeamGetQuery = {
	search?: string
	page?: string
	perPage?: string
	sortField?: string
	sortOrder?: string
	hackathon?: string
	status?: string
	minMembers?: string
	maxMembers?: string
}

interface TeamData {
	totalCount: { totalCount: number }[]
	paginatedData: TeamDocument[]
}

const getTeams = async (req: Request, res: Response) => {
	try {
		let {
			search,
			page = "1",
			perPage = "10",
			sortField = "createdAt",
			sortOrder = "asc",
			hackathon,
			status,
			minMembers,
			maxMembers,
		}: TeamGetQuery = req.query

		// Building the match conditions for the aggregation pipeline
		const match: any = {}
		if (search) {
			const regex = new RegExp(search, "i")
			match.$or = [{ name: regex }, { description: regex }]
		}
		if (hackathon) {
			const hackathonRegex = new RegExp(hackathon, "i")
			match.$or = [
				{ "hackathon.listedHackathon.name": hackathonRegex },
				{ "hackathon.customHackathon": hackathonRegex },
			]
		}
		if (status) match.status = status
		if (minMembers || maxMembers) {
			match.members = {}
			if (minMembers) match.members.$gte = parseInt(minMembers)
			if (maxMembers) match.members.$lte = parseInt(maxMembers)
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

		const result: TeamData[] = await Team.aggregate(aggregationPipeline)

		const totalCount =
			result[0].totalCount.length > 0
				? result[0].totalCount[0].totalCount
				: 0
		const paginatedData: TeamDocument[] = result[0].paginatedData

		const response = {
			totalCount,
			data: paginatedData,
		}

		res.status(200).json(response)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				message: "Error fetching teams",
				error: error.message,
			})
		} else {
			res.status(500).json({
				message: "Unknown error fetching teams",
			})
		}
	}
}

export const getTeam = async (req: Request, res: Response) => {
	try {
		const { teamID } = req.params // Assuming teamID is a route parameter

		const team = await Team.findById(teamID)

		if (!team) {
			return handleNotFound(res, "Team Not Found")
		}

		res.status(200).json(team)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				message: "Error fetching team",
				error: error.message,
			})
		} else {
			res.status(500).json({
				message: "Unknown error fetching team",
			})
		}
	}
}

// Controller function to create a new team
export const createTeam = async (req: Request, res: Response) => {
	try {
		const { name, description, hackathon, memberLimit, requiredRoles } =
			req.body

		const userID = req.body.user

		const team = await Team.create({
			name,
			description,
			hackathon,
			memberLimit,
			requiredRoles,
			createdBy: userID,
		})
		return res.status(201).json(team)
	} catch (err) {
		return handleServerError(res, err)
	}
}

// Controller function to update an existing team
export const updateTeam = [
	verifyTeamLeader,
	async (req: Request, res: Response) => {
		try {
			const {
				teamID,
				name,
				description,
				hackathon,
				memberLimit,
				requiredRoles,
			} = req.body

			const team = await Team.findByIdAndUpdate(teamID, {
				name,
				description,
				hackathon,
				memberLimit,
				requiredRoles,
			})

			return res
				.status(201)
				.json({ data: team, message: "Updated Team Succesfully" })
		} catch (err) {
			return handleServerError(res, err)
		}
	},
]

// Controller function to delete a team
export const deleteTeam = [
	verifyTeamLeader,
	async (req: Request, res: Response) => {
		try {
			const { teamID } = req.body
			await Team.findByIdAndDelete(teamID)
			return res
				.status(200)
				.json({ message: "Deleted Team Successfully" })
		} catch (err) {
			return handleServerError(res, err)
		}
	},
]

// Controller function to remove a team member
export const removeTeamMember = [
	verifyTeamLeader,
	async (req: Request, res: Response) => {
		try {
			const { teamID, memberID } = req.body

			const team: TeamDocument = req.body.team

			if (
				!team.members.find((m) => m.toString() === memberID.toString())
			) {
				return handleNotFound(res, "Member not found in Team")
			}

			team.members = team.members.filter(
				(m) => m._id.toString() !== memberID.toString()
			)
			const newTeam = await Team.findByIdAndUpdate(teamID, team)

			return res.status(200).json({
				data: newTeam,
				message: "Removed Team Member Successfully",
			})
		} catch (err) {
			return handleServerError(res, err)
		}
	},
]
