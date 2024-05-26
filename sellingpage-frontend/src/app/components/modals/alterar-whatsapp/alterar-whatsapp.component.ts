import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { GestaoService } from 'src/app/services/gestao.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-alterar-whatsapp',
  templateUrl: './alterar-whatsapp.component.html',
  styleUrls: ['./alterar-whatsapp.component.css']
})
export class AlterarWhatsappComponent {
  @Output() fecharModal: EventEmitter<any> = new EventEmitter
  @Input() alteracao: boolean = false
  carregando = false;
  constructor(
    private gestaoService: GestaoService,
    private utils: UtilsService,
    private _snackBar: MatSnackBar
  ) { }
  openSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'OK', { duration: 1300, verticalPosition: 'bottom' });
  }
  private subs = new Subscription()
  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  formularioAlterarWhatsapp = new FormGroup({
    whatsapp: new FormControl('', [Validators.nullValidator, Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)])
  })

  fechar() {
    this.formularioAlterarWhatsapp.reset()
    this.fecharModal.emit()
  }

  alterarWhatsapp(){
    if(this.formularioAlterarWhatsapp.valid){
      this.utils.carregandoSubject.next(true)
      if (this.alteracao){
        this.subs.add(
          this.gestaoService.alterarNumeroWhatsapp(this.formularioAlterarWhatsapp.controls['whatsapp'].value!).subscribe(retorno => {
            this.utils.carregandoSubject.next(false)
            if (retorno.status == "sucesso") {
              this.openSnackBar("Número cadastrado.")
              this.fechar()
            } else {
              alert(retorno.mensagem)
            }
          },
          error => {
            alert(JSON.stringify(error.name))
            this.utils.carregandoSubject.next(false)
          })
        )
      } else {
        this.subs.add(
          this.gestaoService.criarNumeroWhatsapp(this.formularioAlterarWhatsapp.controls['whatsapp'].value!).subscribe(retorno => {
            this.utils.carregandoSubject.next(false)
            if (retorno.status == "sucesso") {
              this.openSnackBar("Número cadastrado.")
              this.fechar()
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
