import { CharutoModel, Charuto } from "../interfaces/Charuto";

export const createCharuto = async (body: Charuto): Promise<Charuto> => {
  try {
    const charuto = new CharutoModel(body);
    await charuto.save();
    return charuto;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao salvar o charuto: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao salvar o charuto");
    }
  }
};

export const getAllCharutos = async (): Promise<Charuto[]> => {
  try {
    const allCharutos = await CharutoModel.find();
    return allCharutos;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar charutos: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar charutos");
    }
  }
};

export const getCharutoById = async (id: string): Promise<Charuto | null> => {
  try {
    const charuto = await CharutoModel.findById(id);
    return charuto;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar charuto por ID: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar charuto por ID");
    }
  }
};

export const deleteCharutoById = async (id: string): Promise<Charuto | null> => {
  try {
    const charutoID = await CharutoModel.findByIdAndDelete(id);
    return charutoID;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Erro ao deletar o charuto pelo ID: ${id}, erro: ${err.message}`
      );
    } else {
      throw new Error("Erro inesperado ao deletar o charuto pelo ID");
    }
  }
};

export const updateCharutoById = async (
  id: string,
  body: Partial<Charuto>
): Promise<Charuto | null> => {
  try {
    const charutoID = await CharutoModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return charutoID;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Erro ao atualizar o charuto pelo ID: ${id}, erro: ${err.message}`
      );
    } else {
      throw new Error("Erro inesperado ao atualizar o charuto pelo ID");
    }
  }
};