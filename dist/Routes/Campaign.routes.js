"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Campaign_controller_1 = require("../controllers/Campaign.controller");
const IsValidToken_1 = __importDefault(require("../Middleware/IsValidToken"));
const router = express_1.default.Router();
router.get("/", Campaign_controller_1.getAllCampaign);
router.get("/:id", Campaign_controller_1.getByIdCampaign);
router.post("/add", IsValidToken_1.default, Campaign_controller_1.addCampaign);
router.delete("/delete/:id", IsValidToken_1.default, Campaign_controller_1.deleteCampaign);
exports.default = router;
