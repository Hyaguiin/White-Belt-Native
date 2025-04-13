"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCharutoById = exports.deleteCharutoById = exports.getCharutoById = exports.getAllCharutos = exports.createCharuto = void 0;
const Charuto_1 = require("../interfaces/Charuto");
const createCharuto = async (body) => {
    try {
        const charuto = new Charuto_1.CharutoModel(body);
        await charuto.save();
        return charuto;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao salvar o charuto: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao salvar o charuto");
        }
    }
};
exports.createCharuto = createCharuto;
const getAllCharutos = async () => {
    try {
        const allCharutos = await Charuto_1.CharutoModel.find();
        return allCharutos;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao buscar charutos: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao buscar charutos");
        }
    }
};
exports.getAllCharutos = getAllCharutos;
const getCharutoById = async (id) => {
    try {
        const charuto = await Charuto_1.CharutoModel.findById(id);
        return charuto;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao buscar charuto por ID: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao buscar charuto por ID");
        }
    }
};
exports.getCharutoById = getCharutoById;
const deleteCharutoById = async (id) => {
    try {
        const charutoID = await Charuto_1.CharutoModel.findByIdAndDelete(id);
        return charutoID;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao deletar o charuto pelo ID: ${id}, erro: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao deletar o charuto pelo ID");
        }
    }
};
exports.deleteCharutoById = deleteCharutoById;
const updateCharutoById = async (id, body) => {
    try {
        const charutoID = await Charuto_1.CharutoModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        return charutoID;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao atualizar o charuto pelo ID: ${id}, erro: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao atualizar o charuto pelo ID");
        }
    }
};
exports.updateCharutoById = updateCharutoById;
