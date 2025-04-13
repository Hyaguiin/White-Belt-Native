"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CharutoController_1 = require("../controller/CharutoController");
const router = express_1.default.Router();
router.post("/", CharutoController_1.createCharutoController);
router.get("/", CharutoController_1.getAllCharutosController);
router.get("/:id", CharutoController_1.getCharutoByIdController);
router.delete("/:id", CharutoController_1.deleteCharutoByIdController);
router.put("/:id", CharutoController_1.updateCharutoByIdController);
exports.default = router;
