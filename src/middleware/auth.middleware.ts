import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()

const authMiddleWare = async (req: Request, next:NextFunction, res:Response)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer") ? authHeader.split(" ")[1] : null;

    if(!token){
        res.status(401).json({messege: "Invalid token"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(error){
        res.status(401).json({message: "Invalid or Expired Token"})
    }

}