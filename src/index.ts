import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import parfumeRoutes from "./Routes/Parfume.routes";
import cors from "cors";

dotenv.config({quiet: true});
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static("public"));

app.get("/", (req, res)=>{
    res.send("Hello");
})
app.use("/parfumes", parfumeRoutes);

mongoose.connect(process.env.MongoDbUri as string).then(()=>{
    console.log("MongoDb Connected");
    app.listen(3002, ()=>{
        console.log("Listening a PORT");
    });
}).catch(()=>{
    console.log("MongoDb NOT connected");
});