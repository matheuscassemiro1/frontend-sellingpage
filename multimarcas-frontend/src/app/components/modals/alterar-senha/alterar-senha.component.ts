import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GestaoService } from 'src/app/services/gestao.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  @Output() fecharModal: EventEmitter<any> = new EventEmitter
  constructor(
    private gestaoService: GestaoService,
    private utils: UtilsService
  ) {

  }
  private subs = new Subscription()
  ngOnDestroy(){
    this.subs.unsubscribe()
  }
  formularioAlterarSenha = new FormGroup({
    senha: new FormControl('', [Validators.nullValidator, Validators.required]),
    token: new FormControl('', [Validators.nullValidator, Validators.required])
  })
  carregando = false;
  alterarSenha() {
    if (this.formularioAlterarSenha.valid) {
      this.utils.carregandoSubject.next(true)
      this.subs.add(
        this.gestaoService.alterarSenhaAdmin(this.formularioAlterarSenha!.controls['senha']!.value!, this.formularioAlterarSenha!.controls['token']!.value!).subscribe(e => {
          this.utils.carregandoSubject.next(false)
          if (e.status == 'sucesso') {
            alert("Senha alterada.")
            this.fechar()
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

  fechar() {
    this.formularioAlterarSenha.reset()
    this.fecharModal.emit()
  }
}
