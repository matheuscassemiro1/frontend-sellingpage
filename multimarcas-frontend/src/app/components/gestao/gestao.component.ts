import { Component } from '@angular/core';
import { GestaoService } from 'src/app/services/gestao.service';
@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.css']
})
export class GestaoComponent {
  constructor (
    private gestaoService: GestaoService
  ) {

  }
  whatsapp: string = '';
  ngOnInit(){
    this.gestaoService.buscarWhatsapp().subscribe(retorno => {
      if (retorno.status == "sucesso"){
        this.whatsapp = retorno.mensagem
      } else {
        this.whatsapp = 'N/A';
      }
    })
  }

  cadastrarNovoWhatsapp(){
    if(confirm('Deseja criar o número de redirecionamento?')){
      let telefone = prompt("Insira o novo telefone: ")
      if (telefone == ''){
        alert("O número não pode estar em branco.")
      } else {
        this.gestaoService.criarNumeroWhatsapp(telefone!).subscribe(retorno => {
          console.log(retorno)
          if (retorno.status == "sucesso"){
            alert("Número cadastrado.")
            location.reload()
          } else {
            alert(retorno.mensagem)
          }
        })
      }
    }
  }

  alterarNumeroWhatsapp(){
    if(confirm('Deseja alterar o número de redirecionamento?')){
      let telefone = prompt("Insira o novo telefone: ")
      if (telefone == ''){
        alert("O número não pode estar em branco.")
      } else {
        this.gestaoService.alterarNumeroWhatsapp(telefone!).subscribe(retorno => {
          console.log(retorno)
          if (retorno.status == "sucesso"){
            alert("Número alterado.")
            location.reload()
          } else {
            alert(retorno.mensagem)
          }
        })
      }
    }
  }
}