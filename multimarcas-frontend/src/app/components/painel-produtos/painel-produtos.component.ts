import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-painel-produtos',
  templateUrl: './painel-produtos.component.html',
  styleUrls: ['./painel-produtos.component.css']
})
export class PainelProdutosComponent {
  constructor(
    @Inject(DOCUMENT) document: Document) {
  }

  formularioProduto = new FormGroup({
    nomeDoProduto: new FormControl(''),
    precoDoProduto: new FormControl(''),
    categoria: new FormControl('default'),
    arquivo: new FormControl('')
  })


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formularioProduto.value);
    if(this.formularioProduto.value.categoria === 'default'){
      alert('Selecione uma categoria!')
    }
   
  }

  abrir() {
    document.getElementById('modalNovoProduto')?.classList.add('d-block')
  }

  fechar() {
    document.getElementById('modalNovoProduto')?.classList.remove('d-block')
  }

}

