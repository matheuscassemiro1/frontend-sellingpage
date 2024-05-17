import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
      public utils: UtilsService
  ){}
  title = 'front';
  
  public carregando: boolean = false
  public subs = new Subscription()
  ngOnInit(){
    this.subs.add(
      this.utils.estadoCarregando().subscribe(estado => {
        this.carregando = estado;
      })
    )
  }
  ngOnDestroy(){
    this.subs.unsubscribe()
  }
}
