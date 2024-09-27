import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() filtrarProduto: EventEmitter<any> = new EventEmitter

  consoleTexto(valor: string){
    this.filtrarProduto.emit(valor)
  }
}
