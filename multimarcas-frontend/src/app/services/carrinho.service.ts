import { Injectable } from '@angular/core';
import { Produto } from './produtos.service';
import { BehaviorSubject, Observable, Subscribable, Subscription, of, reduce } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  carrinho: Item[] = [];
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.carrinho);
  

  adicionarAoCarrinho(produto: Produto) {
    const testeIndexProduto = this.carrinho.findIndex(armazenado => armazenado.nome == produto.nome)
    if (testeIndexProduto >= 0) {
      this.carrinho[testeIndexProduto].quantidade += produto.quantidade
      this.itemsSubject.next(this.carrinho)
    } else {
      this.carrinho.push({ nome: produto.nome, quantidade: produto.quantidade });
      this.itemsSubject.next(this.carrinho)
    }
  }

  listarCarrinho() {
    return this.carrinho;
  }
  contarItens() {
    return this.itemsSubject.asObservable()
  }

  limparCarrinho(item: Item) {
    this.carrinho = [];
    return this.carrinho;
  }

  removerItemCarrinho(item: Item){
    const testeIndexProduto = this.carrinho.findIndex(armazenado => armazenado.nome == item.nome)
    if (testeIndexProduto >= 0) {
      this.carrinho.splice(testeIndexProduto, 1)
      this.itemsSubject.next(this.carrinho)
    }
  }

  constructor() { }
}

export interface Item {
  nome: string,
  quantidade: number
}