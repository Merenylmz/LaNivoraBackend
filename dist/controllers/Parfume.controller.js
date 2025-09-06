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
exports.editParfume = exports.deleteParfume = exports.addParfume = exports.getBySlugParfume = exports.getAllParfume = void 0;
const Parfume_repository_1 = __importDefault(require("../Repository/Parfume.repository"));
const parfumeRepository = new Parfume_repository_1.default();
const getAllParfume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parfumes = yield parfumeRepository.getAllParfume(req.query.isadminpanel == "1" ? true : false);
        res.send(parfumes);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllParfume = getAllParfume;
const getBySlugParfume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parfume = yield parfumeRepository.getBySlugParfume(req.params.slug, req.query.isadminpanel == "1" ? true : false);
        res.send(parfume);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getBySlugParfume = getBySlugParfume;
const addParfume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            return res.send({ "msg": "Please Give Images", status: false });
        }
        const files = req.files;
        const urls = files.map((file) => `${process.env.BASE_URL}/public/uploads/${file.filename}`);
        const data = Object.assign(Object.assign({}, req.body), { images: urls });
        const newParfume = yield parfumeRepository.addParfume(data);
        res.send(true);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addParfume = addParfume;
const deleteParfume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield parfumeRepository.deleteParfume(req.params.slug);
        res.send(status);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteParfume = deleteParfume;
const editParfume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        if (req.files) {
            const files = req.files;
            const urls = files.map((file) => `${process.env.BASE_URL}/public/uploads/${file.filename}`);
            data = Object.assign(Object.assign({}, req.body), { images: urls });
        }
        const status = yield parfumeRepository.editParfume(req.params.slug, data);
        res.send(status);
    }
    catch (error) {
        console.log(error);
    }
});
exports.editParfume = editParfume;
