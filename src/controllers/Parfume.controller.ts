import { Request, Response } from "express";
import ParfumeRepository from "../Repository/Parfume.repository";

const parfumeRepository = new ParfumeRepository();

const getAllParfume = async(req : Request, res: Response) =>{
    try {
        const parfumes = await parfumeRepository.getAllParfume(req.query.isadminpanel == "1" ? true : false);
        res.send(parfumes);
    } catch (error) {
        console.log(error);
    }
};
const getBySlugParfume = async(req : Request, res: Response) =>{
    try {
        const parfume = await parfumeRepository.getBySlugParfume(req.params.slug, req.query.isadminpanel == "1" ? true : false);
        res.send(parfume);
    } catch (error) {
        console.log(error);
    }
};
const addParfume = async(req : Request, res: Response) =>{
    try {
        if (!req.files) {
            return res.send({"msg": "Please Give Images", status: false});
        }
        console.log(req.body);
        
        const files = req.files as Express.Multer.File[];
        const urls = files.map((file) => `${process.env.BASE_URL}/public/uploads/${file.filename}`);
        
        const data = {...req.body, images: urls};

        const newParfume = await parfumeRepository.addParfume(data);
        res.send(true);
    } catch (error) {
        console.log(error);
    }
};
const deleteParfume = async(req : Request, res: Response) =>{
    try {
        const status = await parfumeRepository.deleteParfume(req.params.slug);
        res.send(status);
    } catch (error) {
        console.log(error);
    }
};
const editParfume = async(req : Request, res: Response) =>{
    try {
        let data = req.body;
        if (req.files) {
            const files = req.files as Express.Multer.File[];
            const urls = files.map((file) => `${process.env.BASE_URL}/public/uploads/${file.filename}`);
            data = {...req.body, images: urls};
        } 

        const status = await parfumeRepository.editParfume(req.params.slug, data);
        res.send(status);
    } catch (error) {
        console.log(error);
    }
};

export {getAllParfume, getBySlugParfume, addParfume, deleteParfume, editParfume};