import { Injectable } from '@angular/core';
import { Produto } from './produtos.service';
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  carrinho: Item[] = [];

  adicionarAoCarrinho(produto: Produto){
    this.carrinho.push({nome: produto.nome, quantidade: produto.quantidade});
    console.log(this.carrinho)
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