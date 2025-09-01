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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../Models/User.model"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.token) {
            return res.send({ status: false, msg: "Please Give token" });
        }
        const decodedToken = yield jsonwebtoken_1.default.verify(req.query.token, process.env.TOKEN_KEY);
        const user = yield User_model_1.default.findOne({ _id: decodedToken.userId });
        if (!user) {
            return res.send({ status: false, msg: "User not found" });
        }
        if (user.lastLoginToken != req.query.token) {
            return res.send({ status: false, msg: "Token is invalid" });
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
});
