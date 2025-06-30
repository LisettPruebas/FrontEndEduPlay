import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/auth/login-service';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})

export class LoginComponent {

  username:string = '';
  password:string = '';
  mensaje :string | null = null;


  constructor(
    private loginService: LoginService,
    private auth: Auth,
    private router: Router
  ){}

  onSubmit(){
    const credenciales = {username: this.username, password:this.password}; //Crea un objeto credenciales con lo que escribió el usuario.
    this.loginService.login(credenciales).subscribe( response => { 
      // Llama a loginService.login(), que hace la petición HTTP.
      // Se suscribe para recibir la respuesta
      this.auth.setLoginState(this.username); //Actualiza el estado de autenticación con auth.setLoginState() (guarda usuario y estado).
      this.router.navigate(['/admin']); //Redirige al usuario a /admin con router.navigate(['/admin']).
    },
    error =>{
      this.mensaje = error.error.error;
    })
  }
  //   ¿Qué es error en ese contexto?
  // Cuando haces una petición HTTP con Angular (this.loginService.login(...).subscribe(...)), si la llamada falla (por ejemplo, usuario o contraseña incorrectos, o error del servidor), la función que recibe el segundo parámetro error => { ... } se ejecuta. Ese parámetro error es el objeto que contiene información sobre el error que devolvió el servidor o la red.
  // ¿Por qué error.error.error?
  // El objeto error de Angular que recibís en el subscribe tiene una estructura como esta:
  // {
  //   "error": {
  //     "error": "Mensaje de error específico"
  //   }
  // }.

  // Esto pasa porque:
  // El primer .error es la propiedad que Angular agrega para contener el cuerpo (body) de la respuesta HTTP con error.
  // El segundo .error es la propiedad que el backend envió dentro del JSON de error con el mensaje que querés mostrar.

  // Ejemplo concreto
  // Si el backend responde con:
  // {
  //   "error": "Usuario o contraseña incorrectos"
  // }
  // Angular pone ese JSON dentro de error.error, entonces:
  // error.error es { "error": "Usuario o contraseña incorrectos" }
  // error.error.error es el string "Usuario o contraseña incorrectos"
}
