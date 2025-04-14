type ProdutoBase = {
  id: string;
  nome: string;
  tipo: string;
  preco: number;
  imagem: string;
};


type Produto = ProdutoBase & {
  quantidade: number;
};
export default ProdutoBase;