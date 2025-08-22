import express from "express";
import { addCampaign, deleteCampaign, getAllCampaign, getByIdCampaign } from "../controllers/Campaign.controller";
import IsValidToken from "../Middleware/IsValidToken";

const router = express.Router();

router.get("/", getAllCampaign);
router.get("/:id", getByIdCampaign);
router.post("/add", IsValidToken, addCampaign);
router.delete("/delete/:id", IsValidToken, deleteCampaign);

export default router;