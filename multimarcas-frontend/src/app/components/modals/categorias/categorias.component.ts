import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria, ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  @Output() fecharModal: EventEmitter<any> = new EventEmitter

  constructor(
    private produtosService: ProdutosService
  ) { }
  formularioCriarCategoria = new FormGroup({
    categoria: new FormControl('', [Validators.nullValidator, Validators.required])
  })
  submitNewCategoria() {
    if (this.formularioCriarCategoria.valid) {
      this.produtosService.criarCategoria(this.formularioCriarCategoria!.controls['categoria']!.value!).subscribe(e => {
        if (e.status == 'sucesso') {
          alert("Categoria cadastrada.")
          this.listarCategorias()
          this.fecharModalCriarCategoria() 
        } else {
          alert("Falha ao cadastrar a categoria")
        }
      })
    }
  }

  fechar() {
    this.fecharModal.emit()
  }
  modalCriarCategoria = false;
  categorias: Categoria[] = []

  abrirModalCriarCategoria() {
    this.modalCriarCategoria = true;
  }

  fecharModalCriarCategoria() {
    this.modalCriarCategoria = false;
  }
  listarCategorias() {
    this.produtosService.getCategorias().subscribe(e => {
      if (e.status == 'sucesso') {
        this.categorias = e.mensagem
      }
    })
  }
  ngOnInit() {
    this.listarCategorias()
  }
  deletarCategoria(categoria: Categoria) {
    if (confirm(`Tem certeza que deseja deletar a categoria "${categoria.categoria}"?`)) {
      this.produtosService.deleteCategoria(categoria.id.toString()).subscribe(e => {
        if (e.status == 'sucesso') {
          this.listarCategorias()
          alert("Categoria excluída.")
        }
      })
    }
  }
}
