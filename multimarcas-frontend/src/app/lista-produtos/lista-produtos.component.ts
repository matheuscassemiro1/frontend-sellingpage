import { Component, OnInit } from '@angular/core';
import { Produto, produtos } from './../product'
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent {
  produtos = [...produtos]
  constructor(
    private carrinhoService: CarrinhoService
  ) {

  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarAoCarrinho(produto)
    //window.alert(`O ${produto.nome} foi adicionado ao seu carrinho!`)
  }

  pedirAgora(produto: Produto) {
    if (this.carrinhoService.listarCarrinho().length == 0) {
      this.carrinhoService.adicionarAoCarrinho(produto)
      window.alert("produto adicionado e redirecionado")
      let carrinho = this.carrinhoService.listarCarrinho()
      let texto = `https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20quero%20comprar+%20+${carrinho[0]}`
      console.log(texto)
    } else {
      window.alert("redirecionado")
      let texto = 'https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20quero%20comprar+%20+'
      let carrinho = this.carrinhoService.listarCarrinho()
      carrinho.forEach(elemento => {
        texto += `%20+${elemento},`
      })
      console.log(texto)
      //https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20gostaria%20de%20comprar+%20+b+%20+c
    }
  }

  carrinhoCheio(): boolean {
    if (this.carrinhoService.listarCarrinho().length > 0) {
      return true;
    } else {
      return false
    }
  }

  fecharCarrinho(){
  window.alert("redirecionado")
  let texto = 'https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20quero%20comprar+%20+'
  let carrinho = this.carrinhoService.listarCarrinho()
  carrinho.forEach(elemento => {
    texto += `%20+${elemento},`
  })
  console.log(texto)
  //https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20gostaria%20de%20comprar+%20+b+%20+c

}

}
