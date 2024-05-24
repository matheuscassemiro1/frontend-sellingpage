import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from './auth.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class GestaoService {

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  buscarWhatsapp(): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.utils.apiUrl}/api/whatsapp`);
  }

  criarNumeroWhatsapp(whatsapp: string): Observable<Resultado> {
    return this.http.post<Resultado>(`${this.utils.apiUrl}/api/whatsapp`, { whatsapp: whatsapp });
  }

  alterarNumeroWhatsapp(whatsapp: string): Observable<Resultado> {
    return this.http.put<Resultado>(`${this.utils.apiUrl}/api/whatsapp`, { whatsapp: whatsapp });
  }

  alterarSenhaAdmin(senha: string, token: string): Observable<Resultado> {
    return this.http.put<Resultado>(`${this.utils.apiUrl}/api/admin`, { senha: senha, token: token });
  }
}
