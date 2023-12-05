import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FormGroup, FormControl } from '@angular/forms';
import { PainelProdutosService } from 'src/app/services/painel-produtos.service';
import { FormularioProdutoNovo } from 'src/app/services/painel-produtos.service';
import { ProdutosService } from 'src/app/services/produtos.service';
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

  ngOnInit(){
    this.listarProdutosPainel()
  }

  lista = produtos;

  listarProdutosPainel() {
    this.produtosService.getAll().subscribe(coisas => {
      coisas.mensagem.forEach(e => {
        e.quantidade = 1;
        produtos.push(e)
      })
      // coisas.mensagem.forEach(e => (console.log(e)))
    })
  }

  filtrarProdutos(texto: string) {
    if (!texto) {
      this.lista = produtos;
    } else {
      this.lista = produtos.filter(produto => !produto.nome.toLowerCase().search(texto.toLowerCase()))
    }
  }

  formularioProduto = new FormGroup({
    nomeDoProduto: new FormControl(''),
    precoDoProduto: new FormControl(''),
    categoria: new FormControl('default')
  })

  imagem: any = '';

  novaImagem: any = '';
  idAltFoto: any = '';
  onSubmit() {
    if (this.formularioProduto.value.categoria === 'default') {

      alert('Selecione uma categoria!')
    } else if (this.imagem == "") {
      alert('Selecione uma imagem')
    } else {
      let formPost: FormularioProdutoNovo = {
        nomeDoProduto: this.formularioProduto.value.nomeDoProduto!,
        precoDoProduto: this.formularioProduto.value.precoDoProduto!,
        categoria: this.formularioProduto.value.categoria!,
        arquivo: this.imagem.target.files[0],
      }
      this.painelProdutosService.cadastrarProduto(formPost).subscribe((resultado) => {
        if (resultado.status == "sucesso") {
          alert(`${this.formularioProduto.value.nomeDoProduto!} cadastrado com sucesso.`)
          location.reload()
        } else {
          alert(resultado.mensagem)
        }
      })
    }
  }

  excluirProduto(produto: Produto) {
    if (confirm(`O produto ${produto.nome} será excluido! Tem certeza?`)) {
      this.painelProdutosService.excluirProduto(produto.id).subscribe(resultado => {
        if (resultado.status == "sucesso"){
          alert("Produto exclúido com sucesso!")
          location.reload()
        } else {
          alert(resultado.mensagem)
        }
      })
    }
  }

  abrir() {
    document.getElementById('modalNovoProduto')?.classList.add('d-block')
  }

  fechar() {
    document.getElementById('modalNovoProduto')?.classList.remove('d-block')
  }

  modalNovaFoto(produto: Produto) {
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
  submitPreco(){
    const idProduto = document.getElementById('idProdutoAltPreco')!.textContent
    const novoPreco = this.formularioNovoPreco.value.novoPreco
    this.painelProdutosService.alterarPrecoProduto(idProduto!, novoPreco!).subscribe(resultado => {
      if(resultado.status == "sucesso"){
        alert("O preço do produto foi alterado com sucesso!")
        location.reload()
      } else {
        alert(resultado.mensagem)
      }
    })
  }

  modalNovoPreco(produto: Produto) {
    document.getElementById('idProdutoAltPreco')!.textContent = `${produto.id}`
    document.getElementById('produtoNomePreco')!.textContent = ` ${produto.nome}`
    document.getElementById('modalAlterarPrecoProduto')?.classList.add('d-block')
    document.getElementById('botaoFechaAlterarPreco')?.addEventListener('click', (e) => {
      document.getElementById('modalAlterarPrecoProduto')?.classList.remove('d-block')
      document.getElementById('idProdutoAltPreco')!.textContent = ``
    })
  }

  alterar() {
    // TODO: Use EventEmitter with form value
    if (this.novaImagem === '') {
      alert('Selecione uma imagem')
    }
    else {
      this.painelProdutosService.alterarImagem(this.idAltFoto, this.novaImagem.target.files[0]).subscribe(resultado => {
        if(resultado.status == "sucesso"){
          alert("A imagem do produto foi alterada com sucesso!")
          location.reload()
        } else {
          alert(resultado.mensagem)
        }
      })
    }
  }

}

