import { Request, Response } from "express";
import User from "../Models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async(req: Request, res: Response) =>{
    try {
        const user = await User.findOne({email: req.body.email});   
        if (!user) {
            return res.send({msg: "User not found", status: false});
        }

        const status = await bcrypt.compare(req.body.password, user.password as string);
        if (!status) {
            return res.send({msg: "Wrong Password", status: false});
        }

        const token = jwt.sign({userId: user._id}, process.env.TOKEN_KEY!);

        user.lastLoginToken = token;
        await user.save()

        res.send({token, user});        
    } catch (error) {
        console.log(error);
    }
};

const register = async(req: Request, res: Response) =>{
    try {
        const user = await User.findOne({email: req.body.email});   
        if (user) {
            return res.send({msg: "User is Already exists", status: false});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username
        });

        await newUser.save();

        res.send(newUser);
    } catch (error) {
        console.log(error);
    }
}


export {login, register};