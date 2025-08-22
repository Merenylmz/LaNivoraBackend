import mongoose from "mongoose";

export interface IParfume extends mongoose.Document {
    title: String,
    brand: String,
    description?: String,
    price: Number,
    otherInfo?: String,
    isActive: Boolean,
    quantity?: Number,
    fragranceNotes?: String,
    images?: Array<String>,
    star?: Boolean,
    slug: String,
    campaignId: any
}

const parfumeSchema = new mongoose.Schema({
    title: String,
    brand: String,
    description: {type: String, nullable: true},
    price: Number,
    otherInfo: {type: String, nullable: true},
    isActive: {type: Boolean, default: true},
    quantity: {type: Number, nullable: true},
    fragranceNotes: {type: String, nullable: true},
    images: {type: Array<String>, nullable: true, default: []},
    star: {type: Boolean, default: false, nullable: true},
    slug: String,
    campaignId: {type: mongoose.Schema.Types.ObjectId, ref: "Campaign", nullable: true}
});

const Parfume = mongoose.model<IParfume>("Parfume", parfumeSchema);

export default Parfume;