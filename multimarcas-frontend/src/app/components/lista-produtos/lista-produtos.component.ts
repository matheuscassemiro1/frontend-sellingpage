import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../carrinho.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/services/produtos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})


export class ListaProdutosComponent {
  lista = produtos;

  onFiltrarProduto(texto: string) {
    if (!texto) {
      this.lista = produtos;
    } else {
      this.lista = produtos.filter(produto => !produto.nome.toLowerCase().search(texto.toLowerCase()))
    }

  }
  constructor(
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
  ) { }
  
  ngOnInit() {
    this.listarProdutos()
}
  listarProdutos() {
    this.produtosService.getAll().subscribe(coisas => {
      coisas.mensagem.forEach(e => {
        e.quantidade = 1;
        produtos.push(e)
      })
      // coisas.mensagem.forEach(e => (console.log(e)))
    })
  }
  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarAoCarrinho(produto)
    this.listarProdutos()
    //window.alert(`O ${produto.nome} foi adicionado ao seu carrinho!`)
  }



  carrinhoCheio(): boolean {
    if (this.carrinhoService.listarCarrinho().length > 0) {
      return true;
    } else {
      return false
    }
  }


  fecharCarrinho() {
    window.alert("redirecionado")
    let texto = 'https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20quero%20comprar+%20+'
    let carrinho = this.carrinhoService.listarCarrinho()
    console.log(carrinho)
    carrinho.forEach((elemento, index) => {
      if (index == carrinho.length - 1) {
        texto += `%20+%20+${elemento.quantidade}%20${elemento.nome}.`
      } else {
        texto += `%20+${elemento.quantidade}%20${elemento.nome},`
      }
    })
    location.href = texto;
    //https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20gostaria%20de%20comprar+%20+b+%20+c

  }

}

export const produtos: Produto[] = []