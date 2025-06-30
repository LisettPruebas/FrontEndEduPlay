//Su responsabilidad es encargarse del inicio de sesión (login).

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Este decorador hace que el servicio esté disponible en toda la aplicación automáticamente.
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:3000/auth/login'; //Define la URL base del endpoint para hacer el login. Esta es la dirección del backend que recibe las credenciales.

  constructor( private http: HttpClient) { } //El constructor inyecta el servicio HttpClient. Lo guardamos como private http para usarlo dentro del servicio.

  login(credenciales: {username: string, password:string}) : Observable<any> {
    //Declara un método llamado login que recibe un objeto con username y password. Devuelve un Observable<any> porque usamos HttpClient.post(...), que devuelve un flujo de respuesta asincrónica.
    return this.http.post(this.apiUrl, credenciales) // Hace una petición HTTP POST al backend, enviando las credenciales. http.post(...) devuelve un Observable, que luego vas a consumir con .subscribe() en el componente.
  }
}

// Cómo se debería corregir: 
// Crear la interfaz
// export interface LoginResponse {
//   token: string;
//   usuario: {
//     id: string;
//     nombre: string;
//     rol: string;
//   };
// }

// Usar el tipo en el servicio
// login(credenciales: { username: string, password: string }): Observable<LoginResponse> {
//   return this.http.post<LoginResponse>(this.apiUrl, credenciales);
// }

// ¿Qué es el tipado estricto?
// El tipado estricto es una característica de TypeScript que obliga a declarar y respetar los tipos de datos en tus variables, funciones, parámetros, etc.

// Es como decirle al código: “Esta variable es de tipo string, y solo va a aceptar textos. Si intento ponerle un número, marcá error.” El tipado estricto es como tener un control de calidad para tu código: evita errores, te guía mientras programás, y hace que todo sea más claro y seguro.