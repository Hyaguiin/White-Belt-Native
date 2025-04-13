"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWhiskyById = exports.deleteWhiskyById = exports.getWhiskyById = exports.getAllWhiskies = exports.createWhisky = void 0;
const Whisky_1 = require("../interfaces/Whisky");
const createWhisky = async (body) => {
    try {
        const whisky = new Whisky_1.WhiskyModel(body);
        await whisky.save();
        return whisky;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao salvar o whisky: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao salvar o whisky");
        }
    }
};
exports.createWhisky = createWhisky;
const getAllWhiskies = async () => {
    try {
        const allWhiskies = await Whisky_1.WhiskyModel.find();
        return allWhiskies;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao buscar whiskies: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao buscar whiskies");
        }
    }
};
exports.getAllWhiskies = getAllWhiskies;
const getWhiskyById = async (id) => {
    try {
        const whisky = await Whisky_1.WhiskyModel.findById(id);
        return whisky;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao buscar whisky por ID: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao buscar whisky por ID");
        }
    }
};
exports.getWhiskyById = getWhiskyById;
const deleteWhiskyById = async (id) => {
    try {
        const whiskyID = await Whisky_1.WhiskyModel.findByIdAndDelete(id);
        return whiskyID;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao deletar o whisky pelo ID: ${id}, erro: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao deletar o whisky pelo ID");
        }
    }
};
exports.deleteWhiskyById = deleteWhiskyById;
const updateWhiskyById = async (id, body) => {
    try {
        const whiskyID = await Whisky_1.WhiskyModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        return whiskyID;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao atualizar o whisky pelo ID: ${id}, erro: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao atualizar o whisky pelo ID");
        }
    }
};
exports.updateWhiskyById = updateWhiskyById;
