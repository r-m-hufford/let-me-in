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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
const app_data_source_1 = require("../../app-data-source");
const user_1 = require("../models/user");
const userRepo = app_data_source_1.myDataSource.getRepository(user_1.User);
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('in the auth route');
    const user = yield userRepo.findOne({
        where: {
            email: req.body.email
        }
    });
    const validatePassword = yield bcrypt_1.default.compare(req.body.password, user.password);
    const token = jwt.sign({ email: user.email, id: user.userId }, 'sillyPrivateKey');
    res.send({
        validatePassword,
        token
    });
}));
exports.authRouter.get('/', (req, res) => {
    res.send('this is the auth route. hot diggity.');
});
