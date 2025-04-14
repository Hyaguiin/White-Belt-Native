import { UsuarioModel, Usuario } from "../interfaces/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const createUsuario = async (body: Usuario): Promise<Usuario> => {
  try {
    const existingUser = await UsuarioModel.findOne({
      $or: [{ email: body.email }, { cpf: body.cpf }],
    });

    if (existingUser) {
      throw new Error(existingUser.email === body.email ? "Email já cadastrado" : "CPF já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(body.senha, 10);
    const usuario = new UsuarioModel({ ...body, senha: hashedPassword });
    await usuario.save();

    return usuario;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao criar usuário: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao criar usuário");
    }
  }
};

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  try {
    const usuarios = await UsuarioModel.find().select("-senha").sort({ nome: 1 });
    return usuarios;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar usuários: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar usuários");
    }
  }
};

export const getUsuarioById = async (id: string): Promise<Usuario | null> => {
  try {
    const usuario = await UsuarioModel.findById(id).select("-senha");
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    return usuario;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar usuário por ID: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar usuário por ID");
    }
  }
};

export const getUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
  try {
    const usuario = await UsuarioModel.findOne({ email });
    return usuario;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao buscar usuário por email: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao buscar usuário por email");
    }
  }
};

export const updateUsuarioById = async (id: string, body: Partial<Usuario>): Promise<Usuario | null> => {
  try {
    if (body.email || body.cpf) {
      const existingUser = await UsuarioModel.findOne({
        _id: { $ne: id },
        $or: [{ email: body.email }, { cpf: body.cpf }],
      });

      if (existingUser) {
        throw new Error(existingUser.email === body.email ? "Email já cadastrado" : "CPF já cadastrado");
      }
    }

    if (body.senha) {
      body.senha = await bcrypt.hash(body.senha, 10);
    }

    const usuario = await UsuarioModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select("-senha");

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return usuario;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao atualizar usuário: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao atualizar usuário");
    }
  }
};

export const deleteUsuarioById = async (id: string): Promise<Usuario | null> => {
  try {
    const usuario = await UsuarioModel.findByIdAndDelete(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    return usuario;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao deletar usuário: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao deletar usuário");
    }
  }
};

export const authenticateUsuario = async (
  email: string,
  senha: string
): Promise<{ usuario: Usuario; token: string } | null> => {
  try {
    const usuario = await UsuarioModel.findOne({ email });

    if (!usuario) {
      throw new Error("Email não encontrado");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email, role: usuario.role }, JWT_SECRET, { expiresIn: "1d" });

    return { usuario, token };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro na autenticação: ${err.message}`);
    } else {
      throw new Error("Erro inesperado na autenticação");
    }
  }
};

export const updatePassword = async (id: string, senhaAtual: string, novaSenha: string): Promise<boolean> => {
  try {
    const usuario = await UsuarioModel.findById(id);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);

    if (!senhaCorreta) {
      throw new Error("Senha atual incorreta");
    }

    usuario.senha = await bcrypt.hash(novaSenha, 10);
    await usuario.save();

    return true;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao atualizar senha: ${err.message}`);
    } else {
      throw new Error("Erro inesperado ao atualizar senha");
    }
  }
};
