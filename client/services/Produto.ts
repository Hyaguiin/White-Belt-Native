// services/produtoService.ts
import axios from 'axios';


const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000' 
  : 'https://seuservidor.com'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});



export const criarProduto = async (tipo: string, produtoData: { nome: string, preco: number, descricao: string }) => {
  let response;

  try {
    switch (tipo) {
      case 'cavalo':
        response = await axios.post(`${API_BASE_URL}/cavalo`, produtoData);
        break;
      case 'charuto':
        response = await axios.post(`${API_BASE_URL}/charuto`, produtoData);
        break;
      case 'whisky':
        response = await axios.post(`${API_BASE_URL}/whisky`, produtoData);
        break;
      default:
        throw new Error('Tipo de produto inválido');
    }
    return response.data;
  } catch (error) {
    if(error instanceof Error){
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }}
};
