import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Categoria, ProdutosService } from 'src/app/services/produtos.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [MatSnackBar]
})
export class CategoriasComponent {
  @Output() fecharModal: EventEmitter<any> = new EventEmitter

  constructor(
    private produtosService: ProdutosService,
    private utils: UtilsService,
    private _snackBar: MatSnackBar
  ) { }
  openSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'OK', { duration: 1300, verticalPosition: 'bottom' });
  }
  private subs = new Subscription()
  formularioCriarCategoria = new FormGroup({
    categoria: new FormControl('', [Validators.nullValidator, Validators.required])
  })
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  submitNewCategoria() {
    if (this.formularioCriarCategoria.valid) {
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.produtosService.criarCategoria(this.formularioCriarCategoria!.controls['categoria']!.value!).subscribe(e => {
          this.utils.carregandoSubject.next(false)
          if (e.status == 'sucesso') {
            this.openSnackBar("Categoria cadastrada.")
            this.listarCategorias()
            this.fecharModalCriarCategoria()
          } else {
            alert("Falha ao cadastrar a categoria")
          }
        },
          error => {
            alert(JSON.stringify(error.name))
            this.utils.carregandoSubject.next(false)
          })
      )
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
  }
  ngOnInit() {
    this.listarCategorias()
  }
  deletarCategoria(categoria: Categoria) {
    if (confirm(`Tem certeza que deseja deletar a categoria "${categoria.categoria}"?`)) {
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.produtosService.deleteCategoria(categoria.id.toString()).subscribe(e => {
          this.utils.carregandoSubject.next(false)
          if (e.status == 'sucesso') {
            this.listarCategorias()
            this.openSnackBar("Categoria excluída.")
          } else {
            alert(e.mensagem)
          }
        },
          error => {
            alert(JSON.stringify(error.name))
            this.utils.carregandoSubject.next(false)
          })
      )
    }
  }
}
