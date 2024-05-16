import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { Categoria, ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/services/produtos.service';
import { Observable } from 'rxjs';
import { GestaoService } from 'src/app/services/gestao.service';
@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})


export class ListaProdutosComponent {
  lista: Produto[] = produtos;
  categorias: Categoria[] | undefined
  carregando = false;
  pagina = 1;
  hasMore = true;
  onFiltrarProduto(texto: string) {
    if (!texto) {
      this.lista = produtos;
      window.scrollY
    } else {
      this.lista = produtos.filter(produto => !produto.nome.toLowerCase().search(texto.toLowerCase()))
    }

  }
  constructor(
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
    private gestaoService: GestaoService
  ) { }
  telefoneWhatsapp: string = '';
  carregarMaisConteudo() {
    if (this.hasMore) {
      if (!this.carregando){
        this.carregando = true;
        this.pagina += 1;
        this.produtosService.getAll(this.pagina).subscribe(retorno => {
          this.carregando = false;
          if (retorno.status == 'sucesso') {
            if (retorno.mensagem.length < 4) {
              this.hasMore = false
            }
            retorno.mensagem.forEach(elemento => {
              elemento.quantidade = 1;
              this.lista.push(elemento)
            })
          
          }
        })
      }
    }
  }
  scrollAteOFim() {
    window.addEventListener('scroll', () => {
      let media = document.body.scrollHeight * 60 / 100
      if (window.scrollY >= media) {
        this.carregarMaisConteudo()
      }
    });
  }
  ngOnInit() {
    this.scrollAteOFim()
    this.listarProdutos()
    this.listarCategorias()
    this.gestaoService.buscarWhatsapp().subscribe(retorno => {
      if (retorno.status == "sucesso") {
        this.telefoneWhatsapp = retorno.mensagem
      } else {
        this.telefoneWhatsapp = 'N/A';
      }
    })

  }
  listarCategorias() {
    this.carregando = true;
    this.produtosService.getCategorias().subscribe(resposta => {
      if (resposta.status == 'sucesso') {
        this.carregando = false;
        this.categorias = resposta.mensagem
      }
    })
  }
  listarProdutos() {
    if (this.lista.length == 0) {
      this.carregando = true;
      this.produtosService.getAll(this.pagina).subscribe(coisas => {
        this.carregando = false;
        coisas.mensagem.forEach(e => {
          e.quantidade = 1;
          produtos.push(e)
        })
        // coisas.mensagem.forEach(e => (console.log(e)))
      })
    }
  }
  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarAoCarrinho(produto)
    //window.alert(`O ${produto.nome} foi adicionado ao seu carrinho!`)
  }



  carrinhoComItems(): boolean {
    if (this.carrinhoService.listarCarrinho().length > 0) {
      return true;
    } else {
      return false
    }
  }


  fecharCarrinho() {
    let texto = `https://api.whatsapp.com/send/?phone=55${this.telefoneWhatsapp}&text=Ol%C3%A1%20eu%20quero%20comprar+%20+`
    let carrinho = this.carrinhoService.listarCarrinho()
    carrinho.forEach((elemento, index) => {
      if (index == carrinho.length - 1) {
        texto += `%20+%20+e%20${elemento.quantidade}%20${elemento.nome}.`
      }
      else {
        texto += `%20+${elemento.quantidade}%20${elemento.nome},`
      }
    })
    location.href = texto;
    //https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20gostaria%20de%20comprar+%20+b+%20+c

  }

}

export const produtos: Produto[] = []