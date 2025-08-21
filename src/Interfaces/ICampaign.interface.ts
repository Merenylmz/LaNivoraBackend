import { ICampaign } from "../Models/Campaign.model";
import { IParfume } from "../Models/Parfume.model";

interface ICampaignInterface{
    getAllCampaign(): Promise<Array<ICampaign>>,
    getByIdCampaign(id: String): Promise<ICampaign>,
    addCampaign(data: Promise<ICampaign>): Promise<void>,
    deleteCampaign(id: String): Promise<Boolean>,
};

export default ICampaignInterface;