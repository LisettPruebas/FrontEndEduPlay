import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth { // Se define la clase Auth.
// Tiene dos propiedades privadas:
private loggedIn: boolean = false; // loggedIn: si el usuario está logueado o no.
private user: string | null = null; // user: nombre del usuario logueado (puede ser null si no hay nadie logueado).

//   Tu servicio usa localStorage para recordar si el usuario está logueado y cuál es su nombre
setLoginState (nombre:string){
  this.loggedIn = true;
  this.user = nombre;
 // Cuando el usuario hace login, se guarda allí:
  localStorage.setItem('loggedIn', 'true'); //Guardar datos
  localStorage.setItem('user', nombre);
  //Si el usuario cierra o recarga la página, esos datos siguen ahí.Luego el servicio puede leerlos para saber que el usuario sigue “logueado”.
}
 isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true'; //Leer datos:
  }

logout() {
  this.loggedIn = false;
  this.user = null;
  localStorage.removeItem('loggedIn'); //Borrar datos:
  localStorage.removeItem('user');
}

getUser() : string | null {
  return this.user;
  //Devuelve el nombre del usuario guardado en memoria (⚠️ pero no lo lee desde localStorage si recargaste la página).
}
  constructor() { }
}

// ¿Por qué es útil para login?
// Si no usaras localStorage, cada vez que recargues la página tu app “olvidaría” si estabas logueado y te tendría que pedir que ingreses usuario y contraseña otra vez. Pero con localStorage, podés guardar el estado y la app puede:
// Saber que ya estás logueado sin que tengas que volver a poner usuario y contraseña.
// Mostrar tu nombre, menú personalizado, etc.

// ⚠️ Importante
// localStorage solo guarda texto (strings), si querés guardar objetos, los convertís a JSON con JSON.stringify() y los recuperás con JSON.parse().
// Es local para ese navegador y equipo, no es seguro para guardar datos sensibles como tokens sin protección.
// Si alguien borra el almacenamiento o usa otro navegador, no tendrás esos datos.