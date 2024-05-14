import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class ProdutosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Retorno> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.get<Retorno>('http://localhost:3001/api/produtos', options);
  }

  getCategorias(): Observable<RetornoCategorias> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.get<RetornoCategorias>('http://localhost:3001/api/categorias', options);
  }

}

export interface Retorno {
  status: string,
  mensagem: [
    Produto
  ]
}

export interface RetornoCategorias {
  status: string,
  mensagem: [
    Categoria
  ]
}

export interface Produto {
  id: number,
  nome: string,
  imagem: string,
  preco: number,
  createdAt: string,
  updatedAt: string,
  quantidade: number
}

export interface Categoria {
  id: number,
  categoria: string
}