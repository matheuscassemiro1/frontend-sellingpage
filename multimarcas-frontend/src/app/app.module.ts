import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';
import { LoginComponent } from './components/login/login.component';
import { Router, RouterModule } from '@angular/router';
import { GestaoComponent } from './components/gestao/gestao.component';
import { PainelProdutosComponent } from './components/painel-produtos/painel-produtos.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: ListaProdutosComponent },
      { path: 'login', component: LoginComponent },
      { path: 'gestao', component: GestaoComponent },
      { path: 'produtos', component: PainelProdutosComponent}])
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaProdutosComponent,
    LoginComponent,
    GestaoComponent,
    PainelProdutosComponent,
    TopBarComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
