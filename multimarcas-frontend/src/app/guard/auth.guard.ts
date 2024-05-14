import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subscriber, Subscription } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Lógica de autenticação, por exemplo, verificar se o usuário está logado
  const token: string | null = inject(AuthService).obterToken()
  const isAuthenticated = inject(AuthService).validarAutenticacao(token).subscribe((resultado) => {
    if (resultado.status == "sucesso") {
      return true;
    } else {
      //window.location.href = '/login';
      return true;
    }
  });

  if (isAuthenticated) {
    return true;
  } else {
    //window.location.href = '/login'; 
    return true;
  }
};
