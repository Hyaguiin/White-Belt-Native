import mongoose, { Schema, Document } from "mongoose";

export interface Usuario extends Document {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  cep: string;
  telefone: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UsuarioSchema = new Schema<Usuario>(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      minlength: [3, "Nome deve ter no mínimo 3 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Por favor, insira um email válido"],
    },
    senha: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
    },
    cpf: {
      type: String,
      required: [true, "CPF é obrigatório"],
      unique: true,
      trim: true,
      match: [/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Por favor, insira um CPF válido (formato: XXX.XXX.XXX-XX)"],
    },
    cep: {
      type: String,
      required: [true, "CEP é obrigatório"],
      trim: true,
      match: [/^\d{5}\-\d{3}$/, "Por favor, insira um CEP válido (formato: XXXXX-XXX)"],
    },
    telefone: {
      type: String,
      required: [true, "Telefone é obrigatório"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    collection: "usuarios",
    timestamps: true,
  }
);

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }
  try {
    next();
  } catch (error: any) {
    next(error);
  }
});

UsuarioSchema.methods.comparePassword = async function (candidatePassword: string) {
  return candidatePassword === this.senha;
};

UsuarioSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

export const UsuarioModel = mongoose.model<Usuario>("Usuario", UsuarioSchema);
