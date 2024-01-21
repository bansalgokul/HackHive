import express from "express"
import { createTeam } from "../controllers/team.controller"
import { verifyTokenCookie } from "../middlewares/verifyToken"

const router = express.Router()

router.use(verifyTokenCookie)

// add verification and sanitization to req.body
router.post("/", createTeam)

export default router
