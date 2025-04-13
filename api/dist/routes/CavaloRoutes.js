"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CavaloController_1 = require("../controller/CavaloController");
const router = express_1.default.Router();
router.post("/", CavaloController_1.createCavaloController);
router.get("/", CavaloController_1.getAllCavalosController);
router.get("/:id", CavaloController_1.getCavaloByIdController);
router.delete("/:id", CavaloController_1.deleteCavaloByIdController);
router.put("/:id", CavaloController_1.updateCavaloByIdController);
exports.default = router;
