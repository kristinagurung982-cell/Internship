import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
}
