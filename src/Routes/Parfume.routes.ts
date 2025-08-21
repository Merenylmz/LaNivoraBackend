import express from "express";
import { addParfume, deleteParfume, editParfume, getAllParfume, getBySlugParfume } from "../controllers/Parfume.controller";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get("/", getAllParfume);
router.get("/:slug", getBySlugParfume);
router.post("/edit/:slug", upload.array("images", 10), editParfume);
router.post("/add", upload.array("images", 10), addParfume);
router.delete("/delete/:slug", deleteParfume);

export default router;