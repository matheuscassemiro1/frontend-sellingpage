import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FormGroup, FormControl } from '@angular/forms';
import { PainelProdutosService } from 'src/app/services/painel-produtos.service';
import { FormularioProdutoNovo } from 'src/app/services/painel-produtos.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produto, produtos } from '../../product'

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

  produtos = [...produtos];

  lista = produtos;
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formularioProduto.value);
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
        } else {
          alert(resultado.mensagem)
        }
      })
    }
  }

  excluirProduto(produto: Produto) {
    if (confirm(`O produto ${produto.nome} será excluido! Tem certeza?`)) {
      //this.painelProdutosService.excluirProduto(produto.id)
    }
  }

  abrir() {
    document.getElementById('modalNovoProduto')?.classList.add('d-block')
  }

  fechar() {
    document.getElementById('modalNovoProduto')?.classList.remove('d-block')
  }

}

