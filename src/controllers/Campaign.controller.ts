import { Request, Response } from "express";
import Campaign from "../Models/Campaign.model";

const getAllCampaign = async(req: Request, res: Response) =>{
    try {
        const campaigns = await Campaign.find();
        res.send(campaigns);
    } catch (error) {
        console.log(error);
    }
};
const getByIdCampaign = async(req: Request, res: Response)=>{
    try {
        const campaign = await Campaign.findById(req.params.id);
        res.send(campaign);
    } catch (error) {
        console.log(error);
    }
};
const addCampaign = async(req: Request, res: Response)=>{
    try {
        const newCampaign = new Campaign(req.body);
        await newCampaign.save();

        res.send(newCampaign);
    } catch (error) {
        console.log(error);
    }
}

const deleteCampaign = async(req: Request, res: Response)=>{
    try {
        const status = await Campaign.deleteOne({_id: req.params.id});
        res.send(status);
    } catch (error) {
        console.log(error);
    }
}



export {getAllCampaign, getByIdCampaign, addCampaign, deleteCampaign};