import { ProdutoModel, Produto } from "../interfaces/Produto";

export const createProduto = async (body: Produto): Promise<Produto> => {
  try {
    const produto = new ProdutoModel(body);
    await produto.save();
    return produto;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao salvar o produto: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao salvar o produto");
    }
  }
};

export const getAllProdutos = async (): Promise<Produto[]> => {
  try {
    const allProdutos = await ProdutoModel.find();
    return allProdutos;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar produtos: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar produtos");
    }
  }
};

export const getProdutoById = async (id: string): Promise<Produto | null> => {
  try {
    const produto = await ProdutoModel.findById(id);
    return produto;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar produto por ID: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar produto por ID");
    }
  }
};

export const deleteProdutoById = async (id: string): Promise<Produto | null> => {
  try {
    const produto = await ProdutoModel.findByIdAndDelete(id);
    return produto;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao deletar o produto pelo ID: ${id}, erro: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao deletar o produto pelo ID");
    }
  }
};

export const updateProdutoById = async (id: string, body: Partial<Produto>): Promise<Produto | null> => {
  try {
    const produto = await ProdutoModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return produto;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao atualizar o produto pelo ID: ${id}, erro: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao atualizar o produto pelo ID");
    }
  }
};
