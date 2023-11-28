import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    @Inject(DOCUMENT) document: Document,
    private loginService: LoginService
    ) {
  }

  formularioLogin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', Validators.required),
  })

  efetuarLogin() {
    console.log(this.formularioLogin);
    this.loginService.tentarLogin(this.formularioLogin.value).subscribe((resultado) => {
      if (Object.values(resultado)[0] == "falha"){
        alert(Object.values(resultado)[1])
      } else {
        
      }
    })
  }

}
