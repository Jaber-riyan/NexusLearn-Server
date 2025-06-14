import express, { Request, Response } from 'express'

export const facultyRouter = express.Router()

facultyRouter.get('/ritu',async(req:Request,res:Response)=>{
    res.json({
        message:"message from faculty"
    })
})