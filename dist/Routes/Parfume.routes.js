"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Parfume_controller_1 = require("../controllers/Parfume.controller");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const IsValidToken_1 = __importDefault(require("../Middleware/IsValidToken"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.get("/", Parfume_controller_1.getAllParfume);
router.get("/:slug", Parfume_controller_1.getBySlugParfume);
router.post("/edit/:slug", IsValidToken_1.default, upload.array("images", 10), Parfume_controller_1.editParfume);
router.post("/add", IsValidToken_1.default, upload.array("images", 10), Parfume_controller_1.addParfume);
router.delete("/delete/:slug", IsValidToken_1.default, Parfume_controller_1.deleteParfume);
exports.default = router;
