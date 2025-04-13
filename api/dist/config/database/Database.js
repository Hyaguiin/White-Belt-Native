"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const dataBaseURL = process.env.DATABASE_URL;
exports.dbConnection = mongoose_1.default.connect(dataBaseURL)
    .then(() => console.log(`Conectou no Banco de DADOS!`))
    .catch((err) => console.error(`Não foi possível conectar ao banco de dados!  ${err}`));
