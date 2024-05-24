import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'express';
import { UtilsService } from './utils.service';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) { }


  validarAutenticacao(): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.utils.apiUrl}/api/auth`)
  }

  tentarLogin(login: string, senha: string): Observable<Resultado> {
    return this.http.post<Resultado>(`${this.utils.apiUrl}/api/login`, { login: login, senha: senha });
  }
}

export interface Resultado {
  status: string,
  mensagem: string
}

