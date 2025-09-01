"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const parfumeSchema = new mongoose_1.default.Schema({
    title: String,
    brand: String,
    description: { type: String, nullable: true },
    price: Number,
    otherInfo: { type: String, nullable: true },
    isActive: { type: Boolean, default: true },
    quantity: { type: Number, nullable: true },
    fragranceNotes: { type: String, nullable: true },
    images: { type: (Array), nullable: true, default: [] },
    star: { type: Boolean, default: false, nullable: true },
    slug: String,
    campaignId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Campaign", nullable: true }
});
const Parfume = mongoose_1.default.model("Parfume", parfumeSchema);
exports.default = Parfume;
