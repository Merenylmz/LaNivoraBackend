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
const Parfume_model_1 = __importDefault(require("../Models/Parfume.model"));
class ParfumeRepository {
    constructor() {
        this.model = Parfume_model_1.default;
    }
    getAllParfume() {
        return __awaiter(this, void 0, void 0, function* () {
            const parfumes = yield this.model.find().populate("campaignId");
            return parfumes;
        });
    }
    getBySlugParfume(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const parfume = yield this.model.findOne({ slug: slug }).populate("campaignId");
            return parfume;
        });
    }
    addParfume(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.create(data);
        });
    }
    deleteParfume(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.model.findOneAndDelete({ slug: slug });
            return status ? true : false;
        });
    }
    editParfume(slug, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resolvedData = yield data;
            const updatePayload = Object.assign({}, resolvedData);
            if (!resolvedData.images || resolvedData.images.length === 0) {
                delete updatePayload.images;
            }
            const editedParfume = yield this.model.updateOne({ slug: slug }, { $set: updatePayload });
            return editedParfume;
        });
    }
}
exports.default = ParfumeRepository;
