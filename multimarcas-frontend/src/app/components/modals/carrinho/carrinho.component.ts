import { Component } from '@angular/core';
import { CarrinhoService, Item } from 'src/app/services/carrinho.service';
import {MatButtonModule} from '@angular/material/button';
import { GestaoService } from 'src/app/services/gestao.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  constructor(
    private carrinhoService: CarrinhoService,
    private gestaoService: GestaoService,
  ) { }
  private subs = new Subscription()
  telefoneWhatsapp: string | undefined
  ngOnDestroy(){
    this.subs.unsubscribe()
  }
  buscarWhatsapp(){
    this.subs.add(
      this.gestaoService.buscarWhatsapp().subscribe(retorno => {
        if (retorno.status == "sucesso") {
          this.telefoneWhatsapp = retorno.mensagem
        }
      })
    )
  }

  items: Item[] = []
  cardProdutos = false;
  contagem: string = '0';
  contarProdutos() {
    this.subs.add(
      this.carrinhoService.contarItens().subscribe((e) => {
        this.items = e
        this.contagem = e.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantidade,
          0,
        ).toString()
      })
    )
  }
  abrirCardProdutos(){
    this.cardProdutos = true;
  }
  fecharCardProdutos(){
    this.cardProdutos = false;
  }
  removerItem(item: Item){
    this.carrinhoService.removerItemCarrinho(item)
  }

  finalizarCompra() {
    let texto = `https://api.whatsapp.com/send/?phone=55${this.telefoneWhatsapp}&text=Ol%C3%A1%20eu%20quero%20comprar+%20+`
    let carrinho = this.carrinhoService.listarCarrinho()
    carrinho.forEach((elemento, index) => {
      if (index == carrinho.length - 1) {
        texto += `%20+%20+e%20${elemento.quantidade}%20${elemento.nome}.`
      } else if (index == carrinho.length - 2){
        texto += `%20+${elemento.quantidade}%20${elemento.nome}`
      }
      else {
        texto += `%20+${elemento.quantidade}%20${elemento.nome},`
      }
    })
    location.href = texto;
    //https://api.whatsapp.com/send/?phone=5531995633606&text=Ol%C3%A1%20eu%20gostaria%20de%20comprar+%20+b+%20+c

  }

  ngOnInit() {
    this.contarProdutos()
    this.buscarWhatsapp()
  }
}
