import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class ProdutosService {

  constructor(private http: HttpClient) { }

  getAll(page: number): Observable<Retorno> {
    return this.http.get<Retorno>(`http://localhost:3001/api/produtos?page=${page}`);
  }

  getAllCategory(categoria: string): Observable<Retorno> {
    return this.http.get<Retorno>(`http://localhost:3001/api/produtos/${categoria}`);
  }

  getAllPannel(): Observable<RetornoPainel> {
    return this.http.get<RetornoPainel>('http://localhost:3001/api/produtos-painel');
  }

  getCategorias(): Observable<RetornoCategorias> {
  
    return this.http.get<RetornoCategorias>('http://localhost:3001/api/categorias');
  }

  deleteCategoria(id: string): Observable<RetornoCategorias> {
    return this.http.delete<RetornoCategorias>(`http://localhost:3001/api/categorias/${id}`);
  }

  criarCategoria(categoria: string): Observable<RetornoCategorias> {
    return this.http.post<RetornoCategorias>(`http://localhost:3001/api/categorias/`, {categoria: categoria});
  }

  alterarCategoria(categoria: string, id: string): Observable<Retorno> {
    return this.http.put<Retorno>(`http://localhost:3001/api/produto-categoria/`, {categoria: categoria, id: id});
  }

}

export interface Retorno {
  status: string,
  mensagem: [
    Produto
  ]
}

export interface RetornoPainel {
  status: string,
  mensagem: [
    ProdutosPainel
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
  categoria_id: number,
  createdAt: string,
  updatedAt: string,
  quantidade: number
}



export interface ProdutosPainel extends Produto {
  categoria: {
    id: number,
    categoria: string
  }
}

export interface Categoria {
  id: number,
  categoria: string
}