import express from "express"
import teamRouter from "./team.route"
import hackathonRouter from "./hackathon.route"
import authRouter from "./auth.route"

const router = express.Router()

router.use("/team", teamRouter)
router.use("/auth", authRouter)
router.use("/hackathon", hackathonRouter)

export default router
