export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  cep: string;
  telefone: string;
  imagem?: string;
  role?: "admin" | "user";
}
