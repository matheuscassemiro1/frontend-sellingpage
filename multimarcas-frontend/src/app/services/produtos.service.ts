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
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.get<Retorno>(`http://localhost:3001/api/produtos?page=${page}`, options);
  }

  getAllCategory(categoria: string): Observable<Retorno> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.get<Retorno>(`http://localhost:3001/api/produtos/${categoria}`, options);
  }

  getAllPannel(): Observable<RetornoPainel> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.get<RetornoPainel>('http://localhost:3001/api/produtos-painel', options);
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

  deleteCategoria(id: string): Observable<RetornoCategorias> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.delete<RetornoCategorias>(`http://localhost:3001/api/categorias/${id}`, options);
  }

  criarCategoria(categoria: string): Observable<RetornoCategorias> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.post<RetornoCategorias>(`http://localhost:3001/api/categorias/`, {categoria: categoria}, options);
  }

  alterarCategoria(categoria: string, id: string): Observable<Retorno> {
    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
      })
    }
    return this.http.put<Retorno>(`http://localhost:3001/api/produto-categoria/`, {categoria: categoria, id: id}, options);
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