import app from "./app";
import { client } from "./config/mongodb"


let server;
const PORT = process.env.PORT || 5000

const bootstrap = async () => {
    await client.connect()
    console.log("Successfully Connected to MongoDB 🎉")

    server = app.listen(PORT, () => {
        console.log(`Local Server listening on port ${PORT}`)
    })
}

bootstrap()
