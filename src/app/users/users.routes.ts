import express, { Request, Response } from "express"

export const usersRouter = express.Router()

usersRouter.get("/all-user", async (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "All Users Showed"
    })
})

