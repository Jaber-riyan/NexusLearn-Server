import express, { Request, Response } from "express"
import { UserModel } from "../models/user.model"
import { IUser } from "../interfaces/users.interface";
const bcrypt = require("bcrypt");


export const usersRouter = express.Router()

usersRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { password, ...user } = req.body

        const existingUser = await UserModel.findOne({
            email: user?.email
        })

        if (existingUser) {
            res.json({
                status: false,
                message: "User Already Exist"
            })
            return
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const createdUser = await UserModel.create({
            ...user,
            password: hashedPass,
            role: user?.role,
            failedAttempts: 0,
            block: false,
        });

        res.status(201).json({
            status: true,
            message: "User created",
            data: createdUser,
        });

    }
    catch (error: any) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});

// get a user from the mongodb by email API
usersRouter.post("/signin/:email", async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const { password, ...userInfo } = req.body;

        let user = await UserModel.findOne({ email });

        if (!user) {
            res.status(404).json({
                status: false,
                message: "User not found",
            });
            return
        }

        if (user.block) {
            res.status(403).json({
                status: false,
                message: "This Email has been blocked, Please contact with admin!",
            });
            return
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            if (user.failedAttempts === 4) {
                await UserModel.updateOne({ email }, { $set: { block: true } });

                res.status(403).json({
                    status: false,
                    message: "Your Email has been blocked. Please contact with admin!",
                });
                return
            } else {
                await UserModel.updateOne(
                    { email },
                    { $inc: { failedAttempts: 1 } }
                );

                const updatedUser = await UserModel.findOne({ email });

                res.status(401).json({
                    status: false,
                    message: `Incorrect Password, Left ${5 - (updatedUser?.failedAttempts || 0)} Attempts`,
                    failedAttempts: updatedUser?.failedAttempts,
                });
                return
            }
        }

        // Reset failed attempts and update last login time
        await UserModel.updateOne({ email }, {
            $set: {
                failedAttempts: 0,
                lastLoginTime: userInfo?.lastLoginTime,
            },
        });

        const updatedUser = await UserModel.findOne({ email });

        res.status(200).json({
            status: true,
            message: "Login Successfully",
            userInfo: updatedUser,
        });
    }
    catch (error: any) {
        res.status(500).json({
            status: false,
            message: "Login failed",
            error: error.message,
        });
    }
});

// get faculty wise student 
usersRouter.get("/get-members/:facultyEmail", async (req: Request, res: Response) => {
    const facultyEmail = req.params.facultyEmail

    const facultySubject = await UserModel.findOne({ email: facultyEmail, role: "faculty" })

    const facultyMember = await UserModel.find({ "studentInfo.department": facultySubject?.facultyInfo?.subject, role: "student" })

    res.json({
        members: facultyMember
    })

})



