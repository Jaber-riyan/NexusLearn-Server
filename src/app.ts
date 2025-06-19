import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import { usersRouter } from "./app/controllers/users.controller"
import { authRouter } from "./app/controllers/auth.controller";
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app: Application = express()

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://nexsus-learn-client.vercel.app"
        ],
        credentials: true,
    })
);

// Middleware 
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

// services 
app.use("/users", usersRouter)
app.use("/auth", authRouter)



app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "Server Working Finely 🎉"
    })
})

export default app

