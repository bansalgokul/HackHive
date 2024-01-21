import express from "express"
import { getHackathons } from "../controllers/hackathon.controller"

const router = express.Router()

router.get("/", getHackathons)

export default router
