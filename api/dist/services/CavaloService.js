"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCavaloById = exports.deleteCavaloById = exports.getCavalosById = exports.getAllCavalos = exports.createCavalo = void 0;
const Cavalo_1 = require("../interfaces/Cavalo");
const createCavalo = async (body) => {
    try {
        const cavalo = new Cavalo_1.CavaloModel(body);
        await cavalo.save();
        return cavalo;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao salvar o cavalo: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao salvar o cavalo");
        }
    }
};
exports.createCavalo = createCavalo;
const getAllCavalos = async () => {
    try {
        const allCavalos = await Cavalo_1.CavaloModel.find();
        return allCavalos;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao buscar cavalos: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao buscar cavalos");
        }
    }
};
exports.getAllCavalos = getAllCavalos;
const getCavalosById = async (id) => {
    try {
        const cavalo = await Cavalo_1.CavaloModel.findById(id);
        return cavalo;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao buscar cavalo por ID: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao buscar cavalo por ID");
        }
    }
};
exports.getCavalosById = getCavalosById;
const deleteCavaloById = async (id) => {
    try {
        const cavaloID = await Cavalo_1.CavaloModel.findByIdAndDelete(id);
        return cavaloID;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao deletar o cavalo pelo ID: ${id}, erro: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao deletar o cavalo pelo ID");
        }
    }
};
exports.deleteCavaloById = deleteCavaloById;
const updateCavaloById = async (id, body) => {
    try {
        const cavaloID = await Cavalo_1.CavaloModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        return cavaloID;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao atualizar o cavalo pelo ID: ${id}, erro: ${err.message}`);
        }
        else {
            throw new Error("Erro inesperado ao atualizar o cavalo pelo ID");
        }
    }
};
exports.updateCavaloById = updateCavaloById;
