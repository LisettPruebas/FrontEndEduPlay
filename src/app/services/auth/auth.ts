import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
private loggedIn: boolean = false;
private user: string | null = null;

setLoginState (nombre:string){
  this.loggedIn = true;
  this.user = nombre;
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('user', nombre);
}
 isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

logout() {
  this.loggedIn = false;
  this.user = null;
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
}

getUser() : string | null {
  return this.user;
}

  constructor() { }
}
