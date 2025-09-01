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
exports.register = exports.login = void 0;
const User_model_1 = __importDefault(require("../Models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.send({ msg: "User not found", status: false });
        }
        const status = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!status) {
            return res.send({ msg: "Wrong Password", status: false });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.TOKEN_KEY);
        user.lastLoginToken = token;
        yield user.save();
        res.send({ token, user, status: true });
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findOne({ email: req.body.email });
        if (user) {
            return res.send({ msg: "User is Already exists", status: false });
        }
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const newUser = new User_model_1.default({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username
        });
        yield newUser.save();
        res.send({ newUser, status: true });
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
