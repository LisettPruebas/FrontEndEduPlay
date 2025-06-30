//Este código es un guardia de ruta (route guard) en Angular para proteger rutas que solo pueden usar usuarios administradores.
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Esta línea importa dos cosas del paquete @angular/router, que es la librería oficial de Angular para manejar rutas:
// CanActivate
// Es una interfaz que define un contrato para los route guards que controlan si una ruta puede ser activada o no. Para usar CanActivate, tu clase debe implementar un método canActivate() que devuelve boolean o un observable/promise que resuelva en boolean.
import { Auth } from '../../services/auth/auth';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}
  // En el constructor se inyectan dos cosas:
  // auth: nuestro servicio de autenticación para saber si el usuario está logueado y quién es.
  // router: para poder redirigir si no tiene permiso.

  canActivate(): boolean {
    const esAdmin = this.auth.isLoggedIn() && this.auth.getUser() === 'admin';
    //Se verifica que el usuario esté logueado (isLoggedIn() === true), que el nombre del usuario sea exactamente 'admin'. Esto define si el usuario es administrador.
    if (!esAdmin) {
      this.router.navigate(['/login']); 
      return false;
      //Si no es admin: Se redirige a la ruta /login. Se devuelve false para bloquear el acceso.
    }
    return true; //se devuelve true y Angular permite entrar a la ruta protegida.
  }
}

// implements CanActivate
// Esto indica que la clase AdminGuard implementa una interfaz llamada CanActivate. Una interfaz en TypeScript es como un contrato que dice:
// "Tu clase debe tener un método llamado canActivate que retorne un boolean (o un Observable/Promise que resuelva en boolean)."
// CanActivate es una interfaz que Angular usa para identificar a los guards que controlan el acceso a rutas.