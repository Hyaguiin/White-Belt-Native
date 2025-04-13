"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
}
const normalizeExpiresIn = () => {
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    if (/^\d+$/.test(expiresIn)) {
        return parseInt(expiresIn, 10);
    }
    const validUnits = ['s', 'm', 'h', 'd'];
    const unit = expiresIn.slice(-1);
    const value = expiresIn.slice(0, -1);
    if (validUnits.includes(unit) && !isNaN(Number(value))) {
        return expiresIn;
    }
    throw new Error(`Invalid format for JWT_EXPIRES_IN: ${expiresIn}. Use numbers (3600) or strings like "1h", "2d"`);
};
const getSignOptions = () => {
    const expiresIn = normalizeExpiresIn();
    return {
        expiresIn
    };
};
const generateToken = (user) => {
    const payload = {
        id: user._id.toString(),
        role: user.role
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, getSignOptions());
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
            if (err)
                return reject(new Error('Invalid token'));
            if (typeof decoded !== 'object' || decoded === null || !('id' in decoded)) {
                return reject(new Error('Malformed token'));
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
