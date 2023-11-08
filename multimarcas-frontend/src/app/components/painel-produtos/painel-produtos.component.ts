import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-painel-produtos',
  templateUrl: './painel-produtos.component.html',
  styleUrls: ['./painel-produtos.component.css']
})
export class PainelProdutosComponent {
  constructor(
    @Inject(DOCUMENT) document: Document) {
  }

  abrir() {
    document.getElementById('modalNovoProduto')?.classList.add('d-block')
  }

  fechar() {
    document.getElementById('modalNovoProduto')?.classList.remove('d-block')
  }

}

