"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.addCampaign = exports.getByIdCampaign = exports.getAllCampaign = void 0;
const Campaign_model_1 = __importDefault(require("../Models/Campaign.model"));
const getAllCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaigns = yield Campaign_model_1.default.find();
        res.send(campaigns);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCampaign = getAllCampaign;
const getByIdCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaign = yield Campaign_model_1.default.findById(req.params.id);
        res.send(campaign);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getByIdCampaign = getByIdCampaign;
const addCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCampaign = new Campaign_model_1.default(req.body);
        yield newCampaign.save();
        res.send(newCampaign);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addCampaign = addCampaign;
const deleteCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield Campaign_model_1.default.deleteOne({ _id: req.params.id });
        res.send(status);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteCampaign = deleteCampaign;
