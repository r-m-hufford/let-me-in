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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const app_data_source_1 = require("../../app-data-source");
const userRepo = app_data_source_1.myDataSource.getRepository(user_1.User);
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepo.find();
    res.send({
        message: 'all the users',
        users: users
    });
}));
exports.userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.findOne({
        where: {
            userId: parseInt(req.params.id)
        }
    });
    res.send(user);
}));
exports.userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = yield user_1.User.hashPassword(password);
    const user = yield userRepo.save({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
    });
    res.send(user);
}));
exports.userRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.update(req.params.id, req.body);
    res.send(user);
}));
exports.userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.delete(req.params.id);
    res.send(user);
}));
