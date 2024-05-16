import { Component } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  constructor(
    private carrinhoService: CarrinhoService
  ) { }
  contagem: string = '0';
  contarProdutos() {
    this.carrinhoService.contarItens().subscribe((e) => {
      this.contagem = e.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantidade,
        0,
      ).toString()
    })
  }
  ngOnInit() {
    this.contarProdutos()
  }
}
