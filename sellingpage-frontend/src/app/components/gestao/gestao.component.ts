import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { GestaoService } from 'src/app/services/gestao.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.css'],
  providers: [MatSnackBar]
})
export class GestaoComponent {
  constructor(
    private gestaoService: GestaoService,
    private utils: UtilsService,
    private _snackBar: MatSnackBar
  ) {

  }
  openSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'OK', { duration: 1300, verticalPosition: 'bottom' });
  }
  private subs = new Subscription()
  ngOnDestoy() {
    this.subs.unsubscribe()
  }
  modalCategorias = false;
  whatsapp: string = '';
  modalAlterarSenha = false;

  abrirModalAlterarSenha() {
    this.modalAlterarSenha = true;
  }
  fecharModalAlterarSenha() {
    this.modalAlterarSenha = false;
  }

  abrirModalCategorias() {
    this.modalCategorias = true;
  }
  fecharModalCategorias() {
    this.modalCategorias = false;
  }

  ngOnInit() {
    this.utils.carregandoSubject.next(true)
    this.subs.add(
      this.gestaoService.buscarWhatsapp().subscribe(retorno => {
        this.utils.carregandoSubject.next(false)
        if (retorno.status == "sucesso") {
          this.whatsapp = retorno.mensagem
        } else {
          this.whatsapp = 'N/A';
        }
      })
    )
  }

  cadastrarNovoWhatsapp() {
    if (confirm('Deseja criar o número de redirecionamento?')) {
      let telefone = prompt("Insira o novo telefone: Ex: 27999552202")
      if (telefone == '' || telefone == null) {
        alert("O número não pode estar em branco.")
      } else {
        this.utils.carregandoSubject.next(true)
        this.subs.add(
          this.gestaoService.criarNumeroWhatsapp(telefone!).subscribe(retorno => {
            this.utils.carregandoSubject.next(false)
            if (retorno.status == "sucesso") {
              this.openSnackBar("Número cadastrado.")
              location.reload()
            } else {
              alert(retorno.mensagem)
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

  alterarNumeroWhatsapp() {
    if (confirm('Deseja alterar o número de redirecionamento?')) {
      let telefone = prompt("Insira o novo telefone: Ex: 27999552202")
      if (telefone == '' || telefone == null) {
        alert("O número não pode estar em branco.")
      } else {
        this.utils.carregandoSubject.next(true)
        this.subs.add(
          this.gestaoService.alterarNumeroWhatsapp(telefone!).subscribe(retorno => {
            this.utils.carregandoSubject.next(false)
            if (retorno.status == "sucesso") {
              this.openSnackBar("Número cadastrado.")
              location.reload()
            } else {
              alert(retorno.mensagem)
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
}
