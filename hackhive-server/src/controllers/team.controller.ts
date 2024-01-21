import Team, { TeamDocument } from "../models/team.model"
import { Response, Request, NextFunction } from "express"

// const getTeams = async (req: Request, res: Response) => {}
// const getTeam = async (req: Request, res: Response) => {}

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
