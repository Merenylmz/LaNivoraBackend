import { Model } from "mongoose";
import IParfumeInterface from "../Interfaces/IParfume.interface";
import Parfume, { IParfume } from "../Models/Parfume.model";

export default class ParfumeRepository implements IParfumeInterface{
    protected model;
    constructor() {
        this.model = Parfume
    }

    async getAllParfume(): Promise<Array<IParfume>> {
        const parfumes = await this.model.find().populate("campaignId");
        return parfumes;
    }
    async getBySlugParfume(slug: String): Promise<IParfume> {
        const parfume = await this.model.findOne({slug: slug}).populate("campaignId") as IParfume;
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