import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: ListaProdutosComponent },
      { path: 'login', component: LoginComponent }])
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaProdutosComponent,
    LoginComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
