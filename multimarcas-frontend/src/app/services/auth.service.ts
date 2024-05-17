import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'express';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private tokenKey = 'token'; // Nome da chave para o token no Local Storage


  salvarToken(token: string): void {
    localStorage.setItem(this.tokenKey, `Bearer ${token}`);
  }

  obterToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  /*
    validarToken(): boolean {
      const token = this.obterToken();
  
      if (token) {
        try {
          const decodedToken: any = jwt_decode(token);
  
          // Verifica se o token não expirou
          const tokenExpirado = Date.now() >= decodedToken.exp * 1000;
          return !tokenExpirado;
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
          return false;
        }
      }
  
      return false; // Retorna falso se não houver token
    }*/

  loginUrl: string = 'http://localhost:3001/api/login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
    })
  };

  validarAutenticacao(): Observable<Resultado> {
      return this.http.get<Resultado>(`http://localhost:3001/api/auth`)
  }

  tentarLogin(credenciais: Object): Observable<Resultado> {

    return this.http.post<Resultado>(this.loginUrl, JSON.stringify(credenciais), this.httpOptions);
  }
}

export interface Resultado {
  status: string,
  mensagem: string
}

