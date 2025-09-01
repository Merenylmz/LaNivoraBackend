"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Parfume_routes_1 = __importDefault(require("./Routes/Parfume.routes"));
const User_routes_1 = __importDefault(require("./Routes/User.routes"));
const Campaign_routes_1 = __importDefault(require("./Routes/Campaign.routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ quiet: true });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://lanivora.net", "http://lanivora.net", "http://localhost:3000", "https://la-nivora-frontend.vercel.app"]
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/public", express_1.default.static("public"));
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/parfumes", Parfume_routes_1.default);
app.use("/auth", User_routes_1.default);
app.use("/campaign", Campaign_routes_1.default);
mongoose_1.default.connect(process.env.MongoDbUri).then(() => {
    console.log("MongoDb Connected");
    app.listen((process.env.PORT || 3002), () => {
        console.log("Listening a PORT");
    });
}).catch(() => {
    console.log("MongoDb NOT connected");
});
