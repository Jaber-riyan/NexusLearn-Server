import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import { usersRouter } from "./app/users/users.routes"
import { facultyRouter } from "./app/faculty/faculty.routes"

const app: Application = express()

// Middleware 
app.use(express.json())
app.use(morgan("dev"))

// services 
app.use("/users",usersRouter)
app.use("/faculty",facultyRouter)


app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "Server Working Finely 🎉"
    })
})

export default app

