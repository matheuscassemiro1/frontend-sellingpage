import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from './auth.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GestaoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  buscarWhatsapp(): Observable<Resultado> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.get<Resultado>('http://localhost:3001/api/whatsapp', options);
  }

  criarNumeroWhatsapp(whatsapp: string): Observable<Resultado> {
    let token = this.authService.obterToken()
    if (token) {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
          "Authorization": token
        })
      }
      
      return this.http.post<Resultado>('http://localhost:3001/api/whatsapp', { whatsapp: whatsapp }, options);
    }

    else {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
        })
      }
      return this.http.post<Resultado>('http://localhost:3001/api/whatsapp', { whatsapp: whatsapp }, options);
    }
  }

  alterarNumeroWhatsapp(whatsapp: string): Observable<Resultado> {
    let token = this.authService.obterToken()
    if (token) {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
          'Authorization': token
        })
      }
      return this.http.put<Resultado>('http://localhost:3001/api/whatsapp', { whatsapp: whatsapp }, options);
    }

    else {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
        })
      }

      return this.http.put<Resultado>('http://localhost:3001/api/whatsapp', { whatsapp: whatsapp }, options);
    }
  }
}
