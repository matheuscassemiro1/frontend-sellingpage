import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  apiUrl: string = environment.API
  carregando: boolean = false;
  carregandoSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  
  estadoCarregando(){
    return this.carregandoSubject.asObservable()
  }
}
