import { Model } from "mongoose";
import ICampaignInterface from "../Interfaces/ICampaign.interface";
import { ICampaign } from "../Models/Campaign.model";

export default class CampaignRepository implements ICampaignInterface{
    protected model;
    constructor(model: Model<ICampaign>) {
        this.model = model
    }
    
    async getAllCampaign(): Promise<Array<ICampaign>> {
        const campaign = await this.model.find();
        return campaign;
    }
    async getByIdCampaign(id: String): Promise<ICampaign> {
        const campaign = await this.model.findOne({_id: id}) as ICampaign;
        return campaign;
    }
    async addCampaign(data: Promise<ICampaign>): Promise<void> {
        await this.model.create(data);
    }
    async deleteCampaign(id: String): Promise<Boolean> {
        const status = await this.model.deleteOne({_id: id}); 
        return status ? true : false;
    }
}