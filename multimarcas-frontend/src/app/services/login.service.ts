import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient) { }

  loginUrl: string = 'http://localhost:3001/api/login';

  tentarLogin(credenciais: Object): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<Object>(this.loginUrl, JSON.stringify(credenciais), httpOptions);
  }
}

