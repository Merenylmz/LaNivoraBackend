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
Object.defineProperty(exports, "__esModule", { value: true });
class CampaignRepository {
    constructor(model) {
        this.model = model;
    }
    getAllCampaign() {
        return __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.model.find();
            return campaign;
        });
    }
    getByIdCampaign(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.model.findOne({ _id: id });
            return campaign;
        });
    }
    addCampaign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.create(data);
        });
    }
    deleteCampaign(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.model.deleteOne({ _id: id });
            return status ? true : false;
        });
    }
}
exports.default = CampaignRepository;
