import { Request, Response } from "express";
import {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByEmail,
  updateUsuarioById,
  deleteUsuarioById,
  authenticateUsuario,
  updatePassword,
} from "../services/UsuarioService";

export const createUsuarioController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err: any) {
    if (err.message.includes("já cadastrado")) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

export const getAllUsuariosController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsuarioByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await getUsuarioById(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUsuarioByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await updateUsuarioById(req.params.id, req.body);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err: any) {
    if (err.message.includes("já cadastrado")) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

export const deleteUsuarioByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await deleteUsuarioById(req.params.id);
    if (usuario) {
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ message: "Email e senha são obrigatórios" });
      return;
    }

    const usuario = await authenticateUsuario(email, senha);
    if (usuario) {
      res.status(200).json({
        message: "Login realizado com sucesso",
        usuario,
      });
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (err: any) {
    if (err.message.includes("não encontrado") || err.message.includes("incorreta")) {
      res.status(401).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

export const updatePasswordController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.params.id;

    if (!senhaAtual || !novaSenha) {
      res.status(400).json({ message: "Senha atual e nova senha são obrigatórias" });
      return;
    }

    const senhaAtualizada = await updatePassword(userId, senhaAtual, novaSenha);
    if (senhaAtualizada) {
      res.status(200).json({ message: "Senha atualizada com sucesso" });
    } else {
      res.status(400).json({ message: "Não foi possível atualizar a senha" });
    }
  } catch (err: any) {
    if (err.message.includes("incorreta")) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

export const getUsuarioByEmailController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await getUsuarioByEmail(req.params.email);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
