import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import User from '../Models/User.model';

export default async (req: Request, res: Response, next: NextFunction)=>{
    try {
        if (!req.query.token) {
            return res.send({status: false, msg: "Please Give token"});
        }
        const decodedToken = await jwt.verify(req.query.token as string, process.env.TOKEN_KEY!) as JwtPayload;
        const user = await User.findOne({_id: decodedToken.userId});
        if (!user) {
            return res.send({status: false, msg: "User not found"});
        }

        if (user.lastLoginToken != req.query.token) {
            return res.send({status: false, msg: "Token is invalid"});
        }
        next();
    } catch (error) {
        console.log(error);
    }
}