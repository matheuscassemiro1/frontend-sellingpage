import { Injectable } from '@angular/core';
import { Produto } from './product'
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  carrinho: Produto[] = [];

  adicionarAoCarrinho(produto: Produto){
    this.carrinho.push(produto);
  }

  listarCarrinho(){
    return this.carrinho.map(produto => produto.nome);
  }

  limparCarrinho(){
    this.carrinho = [];
    return this.carrinho;
  }

  constructor() { }
}