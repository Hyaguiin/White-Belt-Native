import { Usuario } from "@/types/Usuario";
import axios from "axios";

export async function registrar(dados: Usuario) {
  try {
    const response = await axios.post("http://localhost:3000/usuarios/criar", dados);
    return response;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
  }
}

export async function login(email: string, senha: string) {
  try {
    const response = await axios.post("http://localhost:3000/usuarios/login", {
      email,
      senha,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
    }
    return response;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
}

export async function verificarLogin() {
  try {
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");
    if (!token || !usuario) {
      return null;
    }
    return JSON.parse(usuario);
  } catch (error) {
    console.error("Erro ao verificar login:", error);
  }
}
