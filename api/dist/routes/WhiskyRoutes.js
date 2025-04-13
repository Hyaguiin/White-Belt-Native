"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WhiskyController_1 = require("../controller/WhiskyController");
const router = express_1.default.Router();
router.post("/", WhiskyController_1.createWhiskyController);
router.get("/", WhiskyController_1.getAllWhiskiesController);
router.get("/:id", WhiskyController_1.getWhiskyByIdController);
router.delete("/:id", WhiskyController_1.deleteWhiskyByIdController);
router.put("/:id", WhiskyController_1.updateWhiskyByIdController);
exports.default = router;
