import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import parfumeRoutes from "./Routes/Parfume.routes";
import authRoutes from "./Routes/User.routes";
import campaignRoutes from "./Routes/Campaign.routes";
import cors from "cors";

dotenv.config({quiet: true});
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://lanivora.net", "http://lanivora.net", "http://localhost:3000", "https://la-nivora-frontend.vercel.app", 'https://www.lanivora.net'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static("public"));

app.get("/", (req, res)=>{
    res.send("Hello");
})
app.use("/parfumes", parfumeRoutes);
app.use("/auth", authRoutes);
app.use("/campaign", campaignRoutes);

mongoose.connect(process.env.MongoDbUri as string).then(()=>{
    console.log("MongoDb Connected");
    app.listen((process.env.PORT || 3002), ()=>{
        console.log("Listening a PORT");
    });
}).catch(()=>{
    console.log("MongoDb NOT connected");
});