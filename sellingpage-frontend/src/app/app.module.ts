import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authGuard } from './guard/auth.guard'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriasComponent } from './components/modals/categorias/categorias.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarrinhoComponent } from './components/modals/carrinho/carrinho.component';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/icons/cart/cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AlterarSenhaComponent } from './components/modals/alterar-senha/alterar-senha.component';
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { AlterarWhatsappComponent } from './components/modals/alterar-whatsapp/alterar-whatsapp.component';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
// registerlocaledata
registerLocaleData(ptBr);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatListModule,
    RouterModule.forRoot([
      { path: '', component: ListaProdutosComponent },
      { path: 'login', component: LoginComponent },
      { path: 'gestao', component: GestaoComponent, canActivate: [authGuard] },
      { path: 'produtos', component: PainelProdutosComponent, canActivate: [authGuard] }]),
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
    FooterComponent,
    LoadingComponent,
    CarrinhoComponent,
    CartComponent,
    AlterarSenhaComponent,
    AlterarWhatsappComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }, {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
