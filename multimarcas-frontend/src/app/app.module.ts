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
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authGuard } from './guard/auth.guard'
import { AuthService } from './services/auth.service';
import { PainelProdutosService } from './services/painel-produtos.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriasComponent } from './components/modals/categorias/categorias.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ListaProdutosComponent },
      { path: 'login', component: LoginComponent },
      { path: 'gestao', component: GestaoComponent, canActivate: [authGuard] },
      { path: 'produtos', component: PainelProdutosComponent, canActivate: [authGuard]  }]),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaProdutosComponent,
    LoginComponent,
    GestaoComponent,
    PainelProdutosComponent,
    TopBarComponent,
    CategoriasComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
