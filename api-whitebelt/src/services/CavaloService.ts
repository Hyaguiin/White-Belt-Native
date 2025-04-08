import { CavaloModel, Cavalo } from "../interfaces/Cavalo";

export const createCavalo = async (body: Cavalo): Promise<Cavalo> => {
  try {
    const cavalo = new CavaloModel(body);
    await cavalo.save();
    return cavalo;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao salvar o cavalo: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao salvar o cavalo");
    }
  }
};

export const getAllCavalos = async (): Promise<Cavalo[]> => {
  try {
    const allCavalos = await CavaloModel.find();
    return allCavalos;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar cavalos: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar cavalos");
    }
  }
};

export const getCavalosById = async (id: string): Promise<Cavalo | null> => {
  try {
    const cavalo = await CavaloModel.findById(id);
    return cavalo;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar cavalo por ID: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar cavalo por ID");
    }
  }
};

export const deleteCavaloById = async (id: string): Promise<Cavalo | null> => {
  try {
    const cavaloID = await CavaloModel.findByIdAndDelete(id);
    return cavaloID;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Erro ao deletar o cavalo pelo ID: ${id}, erro: ${err.message}`
      );
    } else {
      throw new Error("Erro inesperado ao deletar o cavalo pelo ID");
    }
  }
};

export const updateCavaloById = async (
  id: string,
  body: Partial<Cavalo>
): Promise<Cavalo | null> => {
  try {
    const cavaloID = await CavaloModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return cavaloID;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Erro ao atualizar o cavalo pelo ID: ${id}, erro: ${err.message}`
      );
    } else {
      throw new Error("Erro inesperado ao atualizar o cavalo pelo ID");
    }
  }
};
