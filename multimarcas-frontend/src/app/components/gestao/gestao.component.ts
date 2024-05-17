import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GestaoService } from 'src/app/services/gestao.service';
@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.css']
})
export class GestaoComponent {
  constructor(
    private gestaoService: GestaoService,

  ) {

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
    this.subs.add(
      this.gestaoService.buscarWhatsapp().subscribe(retorno => {
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
        this.subs.add(
          this.gestaoService.criarNumeroWhatsapp(telefone!).subscribe(retorno => {
            if (retorno.status == "sucesso") {
              alert("Número cadastrado.")
              location.reload()
            } else {
              alert(retorno.mensagem)
            }
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
        this.subs.add(
          this.gestaoService.alterarNumeroWhatsapp(telefone!).subscribe(retorno => {
            if (retorno.status == "sucesso") {
              alert("Número alterado.")
              location.reload()
            } else {
              alert(retorno.mensagem)
            }
          })
        )
      }
    }
  }
}
