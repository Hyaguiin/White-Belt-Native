"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const JWT_1 = require("../utils/JWT");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new ApiError_1.default(401, 'Not authorized to access this route. No token provided.');
        }
        // 2) Verifica e decodifica o token
        const decoded = await (0, JWT_1.verifyToken)(token);
        // 3) Busca o usuário no banco de dados
        const currentUser = await UserModel_1.default.findById(decoded.id);
        if (!currentUser) {
            throw new ApiError_1.default(401, 'The user belonging to this token no longer exists.');
        }
        req.user = {
            id: currentUser._id.toString(),
            role: currentUser.role
        };
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError_1.default(403, 'Not authorized to access this route.'));
        }
        next();
    };
};
exports.authorize = authorize;
