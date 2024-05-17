import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GestaoService } from 'src/app/services/gestao.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  @Output() fecharModal: EventEmitter<any> = new EventEmitter
  constructor(
    private gestaoService: GestaoService,
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
      this.subs.add(
        this.gestaoService.alterarSenhaAdmin(this.formularioAlterarSenha!.controls['senha']!.value!, this.formularioAlterarSenha!.controls['token']!.value!).subscribe(e => {
          if (e.status == 'sucesso') {
            alert("Senha alterada.")
            this.fechar()
          } else {
            alert(e.mensagem)
          }
        })
      )
    }
  }

  fechar() {
    this.formularioAlterarSenha.reset()
    this.fecharModal.emit()
  }
}
