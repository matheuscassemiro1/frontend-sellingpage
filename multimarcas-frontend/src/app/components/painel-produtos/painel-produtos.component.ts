import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PainelProdutosService } from 'src/app/services/painel-produtos.service';
import { FormularioProdutoNovo } from 'src/app/services/painel-produtos.service';
import { Categoria, ProdutosPainel, ProdutosService } from 'src/app/services/produtos.service';
import { Produto } from 'src/app/services/produtos.service';
import { produtos } from '../lista-produtos/lista-produtos.component';
import { ListaProdutosComponent } from '../lista-produtos/lista-produtos.component';

@Component({
  selector: 'app-painel-produtos',
  templateUrl: './painel-produtos.component.html',
  styleUrls: ['./painel-produtos.component.css']
})

export class PainelProdutosComponent {
  constructor(
    @Inject(DOCUMENT) document: Document,
    private painelProdutosService: PainelProdutosService,
    private produtosService: ProdutosService
  ) {
  }

  ngOnInit() {
    this.listarProdutosPainel()
  }
  categorias: Categoria[] = []
  produtos: ProdutosPainel[] = []
  lista: ProdutosPainel[] = []

  listarProdutosPainel() {
    this.produtosService.getAllPannel().subscribe(retorno => {
      if (retorno.status == 'sucesso') {
        this.lista = retorno.mensagem
        this.produtos = retorno.mensagem
      }
    })
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
      this.painelProdutosService.cadastrarProduto(formPost).subscribe((resultado) => {
        if (resultado.status == "sucesso") {
          alert(`${this.formularioProduto.value.nomeDoProduto!} cadastrado com sucesso.`)
          this.listarProdutosPainel()
          this.formularioProduto.reset()
          this.fechar()
        } else {
          alert(resultado.mensagem)
        }
      })
    }
  }

  excluirProduto(produto: ProdutosPainel) {
    if (confirm(`O produto ${produto.nome} será excluido! Tem certeza?`)) {
      this.painelProdutosService.excluirProduto(produto.id).subscribe(resultado => {
        if (resultado.status == "sucesso") {
          this.listarProdutosPainel()
          alert("Produto exclúido com sucesso!")
        } else {
          alert(resultado.mensagem)
        }
      })
    }
  }

  abrir() {
    this.produtosService.getCategorias().subscribe(e => {
      if (e.status == 'sucesso') {
        this.categorias = e.mensagem
      }
    })
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
    this.painelProdutosService.alterarPrecoProduto(idProduto!, novoPreco!).subscribe(resultado => {
      if (resultado.status == "sucesso") {
        document.getElementById('modalAlterarPrecoProduto')?.classList.remove('d-block')
        document.getElementById('idProdutoAltPreco')!.textContent = ``
        this.formularioNovoPreco.reset()
        alert("O preço do produto foi alterado com sucesso!")
        this.listarProdutosPainel()
      } else {
        alert(resultado.mensagem)
      }
    })
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
    this.produtosService.getCategorias().subscribe(e => {
      if (e.status == 'sucesso') {
        this.categorias = e.mensagem
      }
    })
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
      this.produtosService.alterarCategoria(this.formularioNovaCategoria!.controls['categoria']!.value!, this.idAltCategoria).subscribe(response => {
        if (response.status == 'sucesso') {
          this.idAltCategoria = undefined
          document.getElementById('modalAlterarCategoriaProduto')?.classList.remove('d-block')
          document.getElementById('idProdutoAltCategoria')!.textContent = ``
          this.listarProdutosPainel()
          this.formularioNovaCategoria.reset()
          alert("Categoria alterada!")
          
        }
      }, error => {
        alert(JSON.stringify(error.message))
      })
    }
  }

  alterar() {
    if (this.novaImagem === '') {
      alert('Selecione uma imagem')
    }
    else {
      this.painelProdutosService.alterarImagem(this.idAltFoto, this.novaImagem.target.files[0]).subscribe(resultado => {
        if (resultado.status == "sucesso") {
          this.listarProdutosPainel()
          alert("A imagem do produto foi alterada com sucesso!")
          location.reload()
        } else {
          alert(resultado.mensagem)
        }
      })
    }
  }

}

