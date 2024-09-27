import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PainelProdutosService } from 'src/app/services/painel-produtos.service';
import { FormularioProdutoNovo } from 'src/app/services/painel-produtos.service';
import { Categoria, ProdutosPainel, ProdutosService } from 'src/app/services/produtos.service';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-painel-produtos',
  templateUrl: './painel-produtos.component.html',
  styleUrls: ['./painel-produtos.component.css'],
  providers: [MatSnackBar]
})

export class PainelProdutosComponent {
  constructor(
    @Inject(DOCUMENT) document: Document,
    private painelProdutosService: PainelProdutosService,
    private produtosService: ProdutosService,
    private utils: UtilsService,
    private _snackBar: MatSnackBar
  ) {
  }
  openSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'OK', { duration: 1300, verticalPosition: 'bottom' });
  }
  private subs = new Subscription()

  ngOnInit() {
    this.listarProdutosPainel()
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  categorias: Categoria[] = []
  produtos: ProdutosPainel[] = []
  lista: ProdutosPainel[] = []

  listarProdutosPainel() {
    this.utils.carregandoSubject.next(true)
    this.subs.add(
      this.produtosService.getAllPannel().subscribe(retorno => {
        this.utils.carregandoSubject.next(false)
        if (retorno.status == 'sucesso') {
          this.lista = retorno.mensagem
          this.produtos = retorno.mensagem
        }
      },
        error => {
          alert(JSON.stringify(error.name))
          this.utils.carregandoSubject.next(false)
        })
    )
  }

  filtrarProdutos(texto: string) {
    if (!texto) {
      this.lista = this.produtos;
    } else {
      this.lista = this.produtos.filter(produto => !produto.nome.toLowerCase().search(texto.toLowerCase()))
    }
  }

  formularioProduto = new FormGroup({
    nomeDoProduto: new FormControl('', [Validators.nullValidator, Validators.required]),
    precoDoProduto: new FormControl('', [Validators.pattern('^[0-9.,]+$'), Validators.required]),
    categoria: new FormControl('default', [Validators.pattern('^[0-9]+$'), Validators.required])
  })

  imagem: any = '';
  novaImagem: any = '';
  idAltFoto: any = '';
  idAltCategoria: any
  onSubmit() {
    if (this.formularioProduto.value.categoria === 'default') {
      alert('Selecione uma categoria!')
    } else {
      let formPost: FormularioProdutoNovo = {
        nomeDoProduto: this.formularioProduto.value.nomeDoProduto!,
        precoDoProduto: this.formularioProduto.value.precoDoProduto!,
        categoria: this.formularioProduto.value.categoria!,
        arquivo: this.imagem.target?.files?.[0],
      }
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.painelProdutosService.cadastrarProduto(formPost).subscribe((resultado) => {
          if (resultado.status == "sucesso") {
            this.openSnackBar(`${this.formularioProduto.value.nomeDoProduto!} cadastrado com sucesso.`)
            this.listarProdutosPainel()
            this.formularioProduto.reset()
            this.fechar()
          } else {
            alert(resultado.mensagem)
          }
        },
          error => {
            alert(JSON.stringify(error.name))
            this.utils.carregandoSubject.next(false)
          })
      )
    }
  }

  excluirProduto(produto: ProdutosPainel) {
    if (confirm(`O produto ${produto.nome} será excluido! Tem certeza?`)) {
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.painelProdutosService.excluirProduto(produto.id).subscribe(resultado => {
          this.utils.carregandoSubject.next(false)
          if (resultado.status == "sucesso") {
            this.listarProdutosPainel()
            this.openSnackBar("Produto excluído com sucesso!")
          } else {
            alert(resultado.mensagem)
          }
        },
          error => {
            alert(JSON.stringify(error.name))
            this.utils.carregandoSubject.next(false)
          })
      )
    }
  }

  abrir() {
    this.utils.carregandoSubject.next(true)
    this.subs.add(
      this.produtosService.getCategorias().subscribe(e => {
        this.utils.carregandoSubject.next(false)
        if (e.status == 'sucesso') {
          this.categorias = e.mensagem
        }
      },
        error => {
          alert(JSON.stringify(error.name))
          this.utils.carregandoSubject.next(false)
        })
    )
    document.getElementById('modalNovoProduto')?.classList.add('d-block')
  }

  fechar() {
    this.formularioProduto.reset()
    document.getElementById('modalNovoProduto')?.classList.remove('d-block')
  }

  modalNovaFoto(produto: ProdutosPainel) {
    document.getElementById('idProdutoAltFoto')!.textContent = `#${produto.id} `
    document.getElementById('produtoNome')!.textContent = produto.nome
    this.idAltFoto = produto.id
    document.getElementById('modalAlterarFotoProduto')?.classList.add('d-block')
    document.getElementById('botaoFechaAlterarFoto')?.addEventListener('click', (e) => {
      document.getElementById('modalAlterarFotoProduto')?.classList.remove('d-block')
      this.idAltFoto = '';
    })
  }


  formularioNovoPreco = new FormGroup({
    novoPreco: new FormControl(''),
  })
  submitPreco() {
    const idProduto = document.getElementById('idProdutoAltPreco')!.textContent
    const novoPreco = this.formularioNovoPreco.value.novoPreco
    this.utils.carregandoSubject.next(true)
    this.subs.add(
      this.painelProdutosService.alterarPrecoProduto(idProduto!, novoPreco!).subscribe(resultado => {
        this.utils.carregandoSubject.next(false)
        if (resultado.status == "sucesso") {
          document.getElementById('modalAlterarPrecoProduto')?.classList.remove('d-block')
          document.getElementById('idProdutoAltPreco')!.textContent = ``
          this.formularioNovoPreco.reset()
          this.openSnackBar("O preço do produto foi alterado com sucesso!")
          this.listarProdutosPainel()
        } else {
          alert(resultado.mensagem)
        }
      },
        error => {
          alert(JSON.stringify(error.name))
          this.utils.carregandoSubject.next(false)
        })
    )
  }

  modalNovoPreco(produto: ProdutosPainel) {
    document.getElementById('idProdutoAltPreco')!.textContent = `${produto.id}`
    document.getElementById('produtoNomePreco')!.textContent = ` ${produto.nome}`
    document.getElementById('modalAlterarPrecoProduto')?.classList.add('d-block')
    document.getElementById('botaoFechaAlterarPreco')?.addEventListener('click', (e) => {
      document.getElementById('modalAlterarPrecoProduto')?.classList.remove('d-block')
      document.getElementById('idProdutoAltPreco')!.textContent = ``
    })
  }
  formularioNovaCategoria = new FormGroup({
    categoria: new FormControl('default', [Validators.required, Validators.pattern('[0-9]')]),
  })
  modalNovaCategoria(produto: ProdutosPainel) {
    this.utils.carregandoSubject.next(true)
    this.subs.add(
      this.produtosService.getCategorias().subscribe(e => {
        if (e.status == 'sucesso') {
          this.utils.carregandoSubject.next(false)
          this.categorias = e.mensagem
        }
      },
        error => {
          alert(JSON.stringify(error.name))
          this.utils.carregandoSubject.next(false)
        })
    )
    document.getElementById('idProdutoAltCategoria')!.textContent = `${produto.id} - ${produto.nome}`
    this.idAltCategoria = produto.id
    document.getElementById('modalAlterarCategoriaProduto')?.classList.add('d-block')
    document.getElementById('botaoFechaAlterarCategoria')?.addEventListener('click', (e) => {
      this.idAltCategoria = undefined
      document.getElementById('modalAlterarCategoriaProduto')?.classList.remove('d-block')
      document.getElementById('idProdutoAltCategoria')!.textContent = ``
    })
  }
  submitCategoria() {
    if (this.formularioNovaCategoria.valid) {
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.produtosService.alterarCategoria(this.formularioNovaCategoria!.controls['categoria']!.value!, this.idAltCategoria).subscribe(response => {
          this.utils.carregandoSubject.next(false)
          if (response.status == 'sucesso') {
            this.idAltCategoria = undefined
            document.getElementById('modalAlterarCategoriaProduto')?.classList.remove('d-block')
            document.getElementById('idProdutoAltCategoria')!.textContent = ``
            this.listarProdutosPainel()
            this.formularioNovaCategoria.reset()
            this.openSnackBar("Categoria alterada!")
          }
        }, error => {
          alert(JSON.stringify(error.message))
        }))
    }
  }

  alterar() {
    if (this.novaImagem === '') {
      alert('Selecione uma imagem')
    }
    else {
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.painelProdutosService.alterarImagem(this.idAltFoto, this.novaImagem.target.files[0]).subscribe(resultado => {
          this.utils.carregandoSubject.next(false)
          if (resultado.status == "sucesso") {
            this.listarProdutosPainel()
            this.openSnackBar("A imagem do produto foi alterada com sucesso!")
            location.reload()
          } else {
            alert(resultado.mensagem)
          }
        },
          error => {
            alert(JSON.stringify(error.name))
            this.utils.carregandoSubject.next(false)
          }))
    }
  }

}

