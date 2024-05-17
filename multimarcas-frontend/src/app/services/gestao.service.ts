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
    return this.http.get<Resultado>('http://localhost:3001/api/whatsapp');
  }

  criarNumeroWhatsapp(whatsapp: string): Observable<Resultado> {
    return this.http.post<Resultado>('http://localhost:3001/api/whatsapp', { whatsapp: whatsapp });
  }

  alterarNumeroWhatsapp(whatsapp: string): Observable<Resultado> {
    return this.http.put<Resultado>('http://localhost:3001/api/whatsapp', { whatsapp: whatsapp });
  }

  alterarSenhaAdmin(senha: string, token: string): Observable<Resultado> {
    return this.http.put<Resultado>('http://localhost:3001/api/admin', { senha: senha, token: token });
  }
}
