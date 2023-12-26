import Team from "../models/team.model"
import { Response, Request } from "express"

// const getTeams = async (req: Request, res: Response) => {}
// const getTeam = async (req: Request, res: Response) => {}

type CreateTeamBody = {
	name: string
	description: string
	requiredRoles: string[]
	memberLimit: string
	hackathon: {
		listedHackathon: string
		customHackathonName: string
	}
}

export interface TypedRequestBody<T> extends Request {
	body: T
}

export const createTeam = async (req: Request, res: Response) => {
	console.log(req.body)
	const { name, description, hackathon, memberLimit, requiredRoles } =
		req.body
	const team = await Team.create({
		name,
		description,
		hackathon,
		memberLimit,
		requiredRoles,
	})
	return res.status(201).json(team)
}
const updateTeam = async (req: Request, res: Response) => {}
const deleteTeam = async (req: Request, res: Response) => {}

const removeTeamMember = async (req: Request, res: Response) => {}
