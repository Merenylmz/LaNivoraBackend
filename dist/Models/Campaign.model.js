"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const campaignSchema = new mongoose_1.default.Schema({
    description: String,
    discount: Number
});
const Campaign = mongoose_1.default.model("Campaign", campaignSchema);
exports.default = Campaign;
