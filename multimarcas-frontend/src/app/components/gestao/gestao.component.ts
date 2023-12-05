import { Component } from '@angular/core';
import { numeroWhatsapp } from 'src/app/services/gestao.service';
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
  zap = ''
  ngOnInit(){
    this.gestaoService.buscarWhatsapp().subscribe(retorno => {
      this.zap = retorno.mensagem
    })
  }
}
