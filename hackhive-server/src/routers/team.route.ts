import express from "express"
import { createTeam } from "../controllers/team.controller"

const router = express.Router()

router.post("/", createTeam)

export default router
