import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { Categoria, ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/services/produtos.service';
import { Observable, Subscription } from 'rxjs';
import { GestaoService } from 'src/app/services/gestao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
  providers: [MatSnackBar]
})


export class ListaProdutosComponent {
  lista: Produto[] = produtos;
  categorias: Categoria[] | undefined
  pesquisaGlobal = true;
  carregando = false;
  pagina = 1;
  hasMore = true;
  selected = 'todos'
  pressionado = true;

  constructor(
    private _snackBar: MatSnackBar,
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
    private gestaoService: GestaoService,
    private utils: UtilsService

  ) { }
  private subs = new Subscription()
  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onFiltrarProduto(texto: string) {
    if (!texto) {
      this.lista = produtos;
      this.pesquisaGlobal = true;
      this.pressionado = true;
      this.selected = 'todos'
    } else {
      this.pressionado = true;
      this.selected = 'todos'
      this.lista = produtos.filter(produto => !produto.nome.toLowerCase().search(texto.toLowerCase()))
    }

  }


  openSnackBar(produto: Produto) {
    this._snackBar.open(`${produto.quantidade.toString()}x ${produto.nome.toString()}(s) adicionado(s) ao carrinho`, 'OK', { duration: 1000, verticalPosition: 'bottom' });
  }
  telefoneWhatsapp: string = '';
  carregarMaisConteudo() {
    if (this.hasMore && this.pesquisaGlobal) {
      if (!this.carregando) {
        this.carregando = true;
        this.pagina += 1;
        this.utils.carregandoSubject.next(true)
        this.subs.add(
          this.produtosService.getAll(this.pagina).subscribe(retorno => {
            this.carregando = false;
            this.utils.carregandoSubject.next(false)
            if (retorno.status == 'sucesso') {
              if (retorno.mensagem.length < 10) {
                this.hasMore = false
              }
              retorno.mensagem.forEach(elemento => {
                elemento.quantidade = 1;
                produtos.push(elemento)
              })
            }
          },
          error => {
            alert(JSON.stringify(error.name))
            this.utils.carregandoSubject.next(false)
          }))
      }
    }
  }
  scrollAteOFim() {
    window.addEventListener('scroll', () => {
      let media = document.body.scrollHeight * 63 / 100
      if (window.scrollY >= media) {
        this.carregarMaisConteudo()
      }
    });
  }
  ngOnInit() {
    this.scrollAteOFim()
    this.listarProdutos()
    this.listarCategorias()
    this.subs.add(
      this.gestaoService.buscarWhatsapp().subscribe(retorno => {
        if (retorno.status == "sucesso") {
          this.telefoneWhatsapp = retorno.mensagem
        } else {
          this.telefoneWhatsapp = 'N/A';
        }
      })
    )

  }
  listarCategorias() {
    this.carregando = true;
    this.subs.add(
      this.produtosService.getCategorias().subscribe(resposta => {
        if (resposta.status == 'sucesso') {
          this.carregando = false;
          this.categorias = resposta.mensagem
        }
      })
    )
  }
  listarProdutos() {
    this.pesquisaGlobal = true;
    this.carregando = true;

    if (produtos.length > 0) {
      this.carregando = false;
      this.lista = produtos
    } else {
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.produtosService.getAll(this.pagina).subscribe(coisas => {
          this.utils.carregandoSubject.next(false)
          this.carregando = false;
          coisas.mensagem.forEach(e => {
            e.quantidade = 1;
            produtos.push(e)
          })
        },
      error => {
        alert(JSON.stringify(error.name))
        this.utils.carregandoSubject.next(false)
      })
      )
    }
  }
  listarProdutosCategoria(categoria: string) {
    this.pesquisaGlobal = false;
    this.utils.carregandoSubject.next(true)
    this.carregando = true;
    this.lista = []
    this.subs.add(
      this.produtosService.getAllCategory(categoria).subscribe(coisas => {
        this.carregando = false;
        this.utils.carregandoSubject.next(false)
        coisas.mensagem.forEach(e => {
          e.quantidade = 1;
          this.lista.push(e)
        })
      },
      error => {
        alert(JSON.stringify(error.name))
        this.utils.carregandoSubject.next(false)
      })
    )
  }
  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarAoCarrinho(produto)
    this.openSnackBar(produto)
  }

  carrinhoComItems(): boolean {
    if (this.carrinhoService.listarCarrinho().length > 0) {
      return true;
    } else {
      return false
    }
  }

}

export const produtos: Produto[] = []