import mongoose from "mongoose";

export interface ICampaign extends mongoose.Document {
    description: String,
    discount: Number
}

const campaignSchema = new mongoose.Schema({
    description: String,
    discount: Number
});

const Campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);

export default Campaign;