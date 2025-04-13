"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWhiskyByIdController = exports.deleteWhiskyByIdController = exports.getWhiskyByIdController = exports.getAllWhiskiesController = exports.createWhiskyController = void 0;
const WhiskyService_1 = require("../services/WhiskyService");
const createWhiskyController = async (req, res) => {
    try {
        const whisky = await (0, WhiskyService_1.createWhisky)(req.body);
        res.status(201).json(whisky);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.createWhiskyController = createWhiskyController;
const getAllWhiskiesController = async (req, res) => {
    try {
        const whiskies = await (0, WhiskyService_1.getAllWhiskies)();
        res.status(200).json(whiskies);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllWhiskiesController = getAllWhiskiesController;
const getWhiskyByIdController = async (req, res) => {
    try {
        const whisky = await (0, WhiskyService_1.getWhiskyById)(req.params.id);
        if (whisky) {
            res.status(200).json(whisky);
        }
        else {
            res.status(404).json({ message: "Whisky não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getWhiskyByIdController = getWhiskyByIdController;
const deleteWhiskyByIdController = async (req, res) => {
    try {
        const whisky = await (0, WhiskyService_1.deleteWhiskyById)(req.params.id);
        if (whisky) {
            res.status(200).json(whisky);
        }
        else {
            res.status(404).json({ message: "Whisky não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteWhiskyByIdController = deleteWhiskyByIdController;
const updateWhiskyByIdController = async (req, res) => {
    try {
        const whisky = await (0, WhiskyService_1.updateWhiskyById)(req.params.id, req.body);
        if (whisky) {
            res.status(200).json(whisky);
        }
        else {
            res.status(404).json({ message: "Whisky não encontrado" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateWhiskyByIdController = updateWhiskyByIdController;
