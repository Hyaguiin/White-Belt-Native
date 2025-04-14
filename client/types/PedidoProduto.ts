import { TipoProduto } from "./TipoProduto";  
  export type PedidoProduto = {
    produtoId: string;
    tipo: TipoProduto; // <- aqui troca pra usar o tipo que tu já criou
    quantidade: number;
  };
  
 