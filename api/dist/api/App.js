"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const Database_1 = require("../config/database/Database");
const CavaloRoutes_1 = __importDefault(require("../routes/CavaloRoutes"));
const CharutoRoutes_1 = __importDefault(require("../routes/CharutoRoutes"));
const WhiskyRoutes_1 = __importDefault(require("../routes/WhiskyRoutes"));
const CarrinhoRoutes_1 = __importDefault(require("../routes/CarrinhoRoutes"));
const CarrinhoService_1 = require("../services/CarrinhoService");
const AuthRoutes_1 = __importDefault(require("../routes/AuthRoutes"));
exports.app = (0, express_1.default)();
let url = [
    'https://hoppscotch.io',
    'http://localhost:8081',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || url.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(body_parser_1.default.json());
exports.app.use('/cavalo', CavaloRoutes_1.default);
exports.app.use('/charuto', CharutoRoutes_1.default);
exports.app.use('/whisky', WhiskyRoutes_1.default);
exports.app.use('/carrinho', CarrinhoRoutes_1.default);
exports.app.use('/api/auth', AuthRoutes_1.default);
const startServer = async () => {
    try {
        await Database_1.dbConnection;
        console.log(`Servidor Iniciou corretamente!`);
        exports.app.get("/", async (req, res) => {
            try {
                console.log(`Servidor Rodando no Browser!`);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Não roudou: ${err.message}`);
                }
                else {
                    throw new Error(`Erro desconhecido!!`);
                }
            }
        });
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Servidor Não iniciou: ${err.message}`);
        }
        else {
            throw new Error(`Error Desconhecido!!`);
        }
    }
};
startServer();
(0, CarrinhoService_1.criarCarrinhoInicial)();
(0, CarrinhoService_1.verificarCarrinhoExistente)();
