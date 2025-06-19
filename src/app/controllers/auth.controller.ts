import express, { NextFunction, Request, Response } from 'express'
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

export const authRouter = express.Router()


// JWT token create and remove APIS
// JWT token create API
authRouter.post("/jwt/create", async (req: Request, res: Response) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7h" });
    res.send({ token });
});


// // verify token middleware
// const verifyToken = (req:Request, res:Response, next:NextFunction) => {
//     // console.log("Inside the verify token");
//     // console.log("received request:", req?.headers?.authorization);
//     if (!req?.headers?.authorization) {
//         return res.status(401).json({ message: "Unauthorized Access!" });
//     }

//     // get token from the headers
//     const token = req?.headers?.authorization;
//     // console.log("Received Token", token);

//     jwt.verify(token, process.env.JWT_SECRET, (err:Error, decoded) => {
//         if (err) {
//             console.error("JWT Verification Error:", err.message);
//             return res.status(401).json({ message: err.message });
//         }
//         // console.log('Decoded Token:', decoded);
//         req.user = decoded;
//         next();
//     });
// };

// // verify admin middleware after verify token
// const verifyAdmin = async (req:Request, res:Response, next:NextFunction) => {
//     const email = req.user.email;
//     const query = { email: email };
//     const user = await usersCollection.findOne(query);
//     const isAdmin = user?.role === "admin";
//     if (!isAdmin) {
//         return res.status(403).send({ message: "forbidden access" });
//     }
//     next();
// };


