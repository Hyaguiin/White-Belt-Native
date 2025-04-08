import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "@/types/Usuario";

export const usuarioService = {
  async salvarUsuario(usuario: Usuario) {
    try {
      const usuarioComId = {
        ...usuario,
        id: usuario.id || Date.now().toString(),
      };

      const usuarioJson = JSON.stringify(usuarioComId);

      await AsyncStorage.setItem(`usuario:${usuarioComId.id}`, usuarioJson);

      return usuarioComId;
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      throw error;
    }
  },

  async buscarUsuarioPorEmail(email: string) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const usuarioKeys = keys.filter((key) => key.startsWith("usuario:"));
      const usuariosString = await AsyncStorage.multiGet(usuarioKeys);
      const usuarioEncontrado = usuariosString.find(([key, value]) => JSON.parse(value || "{}").email === email);

      return usuarioEncontrado ? JSON.parse(usuarioEncontrado[1] || "{}") : null;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },

  async login(email: string, senha: string) {
    try {
      const usuario = await this.buscarUsuarioPorEmail(email);

      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      if (usuario.senha !== senha) {
        throw new Error("Senha incorreta");
      }

      await AsyncStorage.setItem(
        "@login_usuario",
        JSON.stringify({
          id: usuario.id,
          email: usuario.email,
          logadoEm: new Date().toISOString(),
        })
      );

      return usuario;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem("@login_usuario");
    } catch (error) {
      console.error("Erro no logout:", error);
      throw error;
    }
  },

  async verificarLogin() {
    try {
      const loginSalvo = await AsyncStorage.getItem("@login_usuario");

      if (!loginSalvo) {
        return null;
      }

      const loginData = JSON.parse(loginSalvo);
      const dataLogin = new Date(loginData.logadoEm);
      const dataAtual = new Date();
      const diferencaDias = (dataAtual.getTime() - dataLogin.getTime()) / (1000 * 3600 * 24);

      if (diferencaDias > 7) {
        await AsyncStorage.removeItem("@login_usuario");
        return null;
      }

      const usuario = await this.buscarUsuarioPorEmail(loginData.email);

      return usuario;
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      return null;
    }
  },

  async listarTodosUsuarios() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const usuarioKeys = keys.filter((key) => key.startsWith("usuario:"));
      const usuariosString = await AsyncStorage.multiGet(usuarioKeys);

      return usuariosString.map(([key, value]) => JSON.parse(value || "{}"));
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return [];
    }
  },
};
