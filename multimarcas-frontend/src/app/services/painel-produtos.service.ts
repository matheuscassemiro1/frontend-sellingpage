import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resultado } from './auth.service';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})

export class PainelProdutosService {

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  cadastrarProduto(formulario: FormularioProdutoNovo): Observable<Resultado> {
    const formdata = new FormData()
    if (formulario.arquivo) {
      formdata.append('imagem', formulario.arquivo)
    }
    formdata.append('nome', formulario.nomeDoProduto)
    formdata.append('preco', formulario.precoDoProduto)
    formdata.append('categoria', formulario.categoria)
    return this.http.post<Resultado>(`${this.utils.apiUrl}/api/produtos`, formdata)
  }

  excluirProduto(id: number): Observable<Resultado> {
    return this.http.delete<Resultado>(`${this.utils.apiUrl}/api/produtos`, {body: {id: id}})
  }

  alterarImagem(id: number, novaImagem: string): Observable<Resultado> {
    const formdata = new FormData()
    formdata.append('imagem', novaImagem)
    formdata.append('id', id.toString())
    return this.http.put<Resultado>(`${this.utils.apiUrl}/api/produto-foto`, formdata)
  }

  alterarPrecoProduto(id: string, novoPreco: string): Observable<Resultado> {
    return this.http.put<Resultado>(`${this.utils.apiUrl}/api/produto`, { id: Number(id), preco: novoPreco })
  }
}


export interface FormularioProdutoNovo {
  nomeDoProduto: string,
  precoDoProduto: string,
  categoria: string,
  arquivo?: string
}
