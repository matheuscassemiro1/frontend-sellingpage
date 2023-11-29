import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Lógica de autenticação, por exemplo, verificar se o usuário está logado
  const isAuthenticated = localStorage.getItem('token');
  if (isAuthenticated != null) {
    return true; // Permite a navegação
  } else {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    window.alert('Você não está autenticado. Será redirecionado para a página de login.');
    window.location.href = '/login'; // Esta é uma forma simples de redirecionar, você pode usar o Router para uma abordagem mais Angular-friendly
    return false;
  }
};