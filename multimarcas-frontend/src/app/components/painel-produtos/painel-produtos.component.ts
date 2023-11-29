import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Input } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FormGroup, FormControl} from '@angular/forms';
import { PainelProdutosService } from 'src/app/services/painel-produtos.service';
import { FormularioProdutoNovo } from 'src/app/services/painel-produtos.service';

@Component({
  selector: 'app-painel-produtos',
  templateUrl: './painel-produtos.component.html',
  styleUrls: ['./painel-produtos.component.css']
})

export class PainelProdutosComponent {
  constructor(
    @Inject(DOCUMENT) document: Document,
    private painelProdutosService: PainelProdutosService,
    ) {
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
    if(this.formularioProduto.value.categoria === 'default'){
     
      alert('Selecione uma categoria!')
    }else if (this.imagem == ""){
      alert('Selecione uma imagem')
    } else {
      let formPost: FormularioProdutoNovo = {
        nomeDoProduto: this.formularioProduto.value.nomeDoProduto!,
        precoDoProduto: this.formularioProduto.value.precoDoProduto!,
        categoria: this.formularioProduto.value.categoria!,
        arquivo: this.imagem.target.files[0],
      }
      this.painelProdutosService.cadastrarProduto(formPost).subscribe((resultado) => {
        console.log(resultado)
      })
    }
    
   
  }

  abrir() {
    document.getElementById('modalNovoProduto')?.classList.add('d-block')
  }

  fechar() {
    document.getElementById('modalNovoProduto')?.classList.remove('d-block')
  }

}

