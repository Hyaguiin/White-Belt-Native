import { WhiskyModel, Whisky } from "../interfaces/Whisky";

export const createWhisky = async (body: Whisky): Promise<Whisky> => {
  try {
    const whisky = new WhiskyModel(body);
    await whisky.save();
    return whisky;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao salvar o whisky: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao salvar o whisky");
    }
  }
};

export const getAllWhiskies = async (): Promise<Whisky[]> => {
  try {
    const allWhiskies = await WhiskyModel.find();
    return allWhiskies;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar whiskies: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar whiskies");
    }
  }
};

export const getWhiskyById = async (id: string): Promise<Whisky | null> => {
  try {
    const whisky = await WhiskyModel.findById(id);
    return whisky;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar whisky por ID: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar whisky por ID");
    }
  }
};

export const deleteWhiskyById = async (id: string): Promise<Whisky | null> => {
  try {
    const whiskyID = await WhiskyModel.findByIdAndDelete(id);
    return whiskyID;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Erro ao deletar o whisky pelo ID: ${id}, erro: ${err.message}`
      );
    } else {
      throw new Error("Erro inesperado ao deletar o whisky pelo ID");
    }
  }
};

export const updateWhiskyById = async (
  id: string,
  body: Partial<Whisky>
): Promise<Whisky | null> => {
  try {
    const whiskyID = await WhiskyModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return whiskyID;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `Erro ao atualizar o whisky pelo ID: ${id}, erro: ${err.message}`
      );
    } else {
      throw new Error("Erro inesperado ao atualizar o whisky pelo ID");
    }
  }
};