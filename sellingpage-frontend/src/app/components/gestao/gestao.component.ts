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
  alterarWhatsapp = false;
  modalCategorias = false;
  whatsapp: string = '';
  modalAlterarSenha = false;
  modalWhatsapp = false;
  abrirModalAltWhatsapp(){
    if (this.whatsapp.length > 0){
      this.alterarWhatsapp = true;
    }
    this.modalWhatsapp = true
  }
  fecharModalAltWhatsapp(){
    this.buscarNumeroWhatsapp()
    this.modalWhatsapp = false
  }
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
  buscarNumeroWhatsapp(){
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
  ngOnInit() {
    this.buscarNumeroWhatsapp()
  }

}
