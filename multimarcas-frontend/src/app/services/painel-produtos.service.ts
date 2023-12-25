import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Resultado } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PainelProdutosService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  cadastrarProduto(formulario: FormularioProdutoNovo): Observable<Resultado> {
    let token = this.authService.obterToken()
    const formdata = new FormData()
    formdata.append('imagem', formulario.arquivo)
    formdata.append('nome', formulario.nomeDoProduto)
    formdata.append('preco', formulario.precoDoProduto)
    formdata.append('categoria', formulario.categoria)
    if (token) {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
          "Authorization": token
        })
      };

      return this.http.post<Resultado>(`http://localhost:3001/api/produtos`, formdata, options)
    } else {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
        })

      };
      return this.http.post<Resultado>(`http://localhost:3001/api/produtos`, formdata, options)
    }

  }

  excluirProduto(id: number): Observable<Resultado> {
    let token = this.authService.obterToken()
    if (token) {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
          "Authorization": token
        }),
        body: { id: id }
      };

      return this.http.delete<Resultado>(`http://localhost:3001/api/produtos`, options)
    } else {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
        }),
        body: { id: id }
      };
      return this.http.delete<Resultado>(`http://localhost:3001/api/produtos`, options)
    }
  }

  alterarImagem(id: number, novaImagem: string): Observable<Resultado> {
    let token = this.authService.obterToken()
    const formdata = new FormData()
    formdata.append('imagem', novaImagem)
    formdata.append('id', id.toString())
    if (token) {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
          "Authorization": token
        })
      };
      return this.http.put<Resultado>(`http://localhost:3001/api/produto-foto`, formdata, options)
    } else {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
        })
      };
      return this.http.put<Resultado>(`http://localhost:3001/api/produto-foto`, formdata, options)
    }
  }

  alterarPrecoProduto(id: string, novoPreco: string): Observable<Resultado> {
    let token = this.authService.obterToken()
    if (token) {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie",
          "Authorization": token
        })
      };

      return this.http.put<Resultado>(`http://localhost:3001/api/produto`, { id: Number(id), preco: novoPreco }, options)
    } else {
      let options = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
        })
      };
      return this.http.put<Resultado>(`http://localhost:3001/api/produto`, { id: Number(id), preco: novoPreco }, options)
    }
  }

}



export interface FormularioProdutoNovo {
  nomeDoProduto: string,
  precoDoProduto: string,
  categoria: string,
  arquivo: string
}
