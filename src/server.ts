import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv'
dotenv.config()


let server;
const PORT = process.env.PORT || 5000

const run = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASS}@cluster0.zwjr9aa.mongodb.net/NexusLearn?retryWrites=true&w=majority&appName=Cluster0`)

    console.log("Successfully Connected to MongoDB 🎉")

    server = app.listen(PORT, () => {
        console.log(`Local Server listening on port ${PORT}`)
    })
}

run()
