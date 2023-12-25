import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    @Inject(DOCUMENT) document: Document,
    private authService: AuthService
  ) {
  }

  formularioLogin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', Validators.required),
  })

  efetuarLogin() {
    interface Resultado {
      status: string,
      mensagem: string
    }
    this.authService.tentarLogin(this.formularioLogin.value).subscribe((resultado) => {

      if (resultado.status == "falha") {
        alert(resultado.mensagem)
      } else {
        this.authService.salvarToken(resultado.mensagem);
        location.href = 'gestao';
      }
    })
  }

}
