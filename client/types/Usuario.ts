export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  imagem: string;
  cep: string;
  numeroCasa: number | null;
  complemento: string | null;
  telefone: string;
}
