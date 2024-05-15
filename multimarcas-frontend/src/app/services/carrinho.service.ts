import { Injectable } from '@angular/core';
import { Produto } from './produtos.service';
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  carrinho: Item[] = [];

  adicionarAoCarrinho(produto: Produto){
    const testeIndexProduto = this.carrinho.findIndex(armazenado => armazenado.nome == produto.nome)
    if(testeIndexProduto >= 0){
      this.carrinho[testeIndexProduto].quantidade += produto.quantidade
    } else {
      this.carrinho.push({nome: produto.nome, quantidade: produto.quantidade});
    }
  }

  listarCarrinho(){
    return this.carrinho;
  }

  limparCarrinho(){
    this.carrinho = [];
    return this.carrinho;
  }

  constructor() { }
}

export interface Item{
  nome: string,
  quantidade: number
}