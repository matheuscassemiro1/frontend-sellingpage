import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})

export class ProdutosService {

  constructor(
    private http: HttpClient,
    private utils: UtilsService

  ) { }

  getAll(page: number): Observable<Retorno> {
    return this.http.get<Retorno>(`${this.utils.apiUrl}/api/produtos?page=${page}`);
  }

  getAllCategory(categoria: string): Observable<Retorno> {
    return this.http.get<Retorno>(`${this.utils.apiUrl}/api/produtos/${categoria}`);
  }

  getAllPannel(): Observable<RetornoPainel> {
    return this.http.get<RetornoPainel>(`${this.utils.apiUrl}/api/produtos-painel`);
  }

  getCategorias(): Observable<RetornoCategorias> {
  
    return this.http.get<RetornoCategorias>(`${this.utils.apiUrl}/api/categorias`);
  }

  deleteCategoria(id: string): Observable<RetornoCategorias> {
    return this.http.delete<RetornoCategorias>(`${this.utils.apiUrl}/api/categorias/${id}`);
  }

  criarCategoria(categoria: string): Observable<RetornoCategorias> {
    return this.http.post<RetornoCategorias>(`${this.utils.apiUrl}/api/categorias/`, {categoria: categoria});
  }

  alterarCategoria(categoria: string, id: string): Observable<Retorno> {
    return this.http.put<Retorno>(`${this.utils.apiUrl}/api/produto-categoria/`, {categoria: categoria, id: id});
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