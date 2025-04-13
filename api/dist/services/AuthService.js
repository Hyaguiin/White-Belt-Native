"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const JWT_1 = require("../utils/JWT");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const register = async (userData) => {
    if (await UserModel_1.default.findOne({ email: userData.email })) {
        throw new ApiError_1.default(400, 'Email already in use');
    }
    const user = await UserModel_1.default.create(userData);
    const token = (0, JWT_1.generateToken)(user);
    return { user, token };
};
exports.register = register;
const login = async (email, password) => {
    const user = await UserModel_1.default.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError_1.default(401, 'Incorrect email or password');
    }
    const token = (0, JWT_1.generateToken)(user);
    return { user, token };
};
exports.login = login;
const getMe = async (userId) => {
    const user = await UserModel_1.default.findById(userId);
    if (!user) {
        throw new ApiError_1.default(404, 'User not found');
    }
    return user;
};
exports.getMe = getMe;
