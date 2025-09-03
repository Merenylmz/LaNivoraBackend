import { Model } from "mongoose";
import IParfumeInterface from "../Interfaces/IParfume.interface";
import Parfume, { IParfume } from "../Models/Parfume.model";

export default class ParfumeRepository implements IParfumeInterface{
    protected model;
    constructor() {
        this.model = Parfume
    }

    async getAllParfume(isAdminPanel: Boolean): Promise<Array<IParfume>> {
        let parfumes;
        if (isAdminPanel) {
            parfumes = await this.model.find().populate("campaignId");
            
        } else{
            parfumes = await this.model.find({isActive: true}).populate("campaignId");
        }
        return parfumes;
    }
    async getBySlugParfume(slug: String, isAdminPanel: Boolean): Promise<IParfume> {
        let parfume;
        if (isAdminPanel) {
            parfume = await this.model.findOne({slug: slug}).populate("campaignId") as IParfume;
        } else{
            parfume = await this.model.findOne({slug: slug, isActive: true}).populate("campaignId") as IParfume;
        }
        return parfume;
    }
    async addParfume(data: Promise<IParfume>): Promise<void> {
        await this.model.create(data);
    }
    async deleteParfume(slug: String): Promise<Boolean> {
        const status = await this.model.findOneAndDelete({slug: slug}); 
        return status ? true : false;
    }
    async editParfume(slug: string, data: Promise<IParfume>): Promise<any> {
        const resolvedData = await data;

        const updatePayload: Partial<IParfume> = { ...resolvedData };

        if (!resolvedData.images || resolvedData.images.length === 0) {
            delete updatePayload.images;
        }

        const editedParfume = await this.model.updateOne(
            { slug: slug },
            { $set: updatePayload }
        );

        return editedParfume;
    }
}