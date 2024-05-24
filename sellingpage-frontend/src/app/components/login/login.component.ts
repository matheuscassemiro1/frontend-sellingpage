import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    @Inject(DOCUMENT) document: Document,
    private authService: AuthService,
    private utils: UtilsService
  ) {
  }
  private subs = new Subscription()
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
  ngOnInit() {
    this.token = localStorage.getItem('token')
    if (this.token) {
      this.subs.add(
        this.authService.validarAutenticacao().subscribe(e => {
          if (e.status == 'sucesso') {
            location.href = 'gestao';
          }
        })
      )
    }
  }
  formularioLogin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', Validators.required),
  })
  token: string | undefined | null

  efetuarLogin() {
    interface Resultado {
      status: string,
      mensagem: string
    }
    this.utils.carregandoSubject.next(true)
    console.log(this.formularioLogin)
    this.subs.add(
      this.authService.tentarLogin(this.formularioLogin!.controls['login']!.value!, this.formularioLogin!.controls['senha']!.value!).subscribe((resultado) => {
        this.utils.carregandoSubject.next(false)
        if (resultado.status == "falha") {
          alert(resultado.mensagem)
        } else {
          localStorage.setItem('token', resultado.mensagem)
          location.href = 'gestao';
        }
      },
      error => {
        alert(JSON.stringify(error.name))
        this.utils.carregandoSubject.next(false)
      })
    )
  }

}
