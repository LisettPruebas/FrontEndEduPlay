import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/auth/login-service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})

export class LoginComponent {

  username:string = '';
  password:string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  onSubmit(){
    const credenciales = {username: this.username, password:this.password};
    this.loginService.login(credenciales).subscribe( response => {
      console.log("login exitoso", response)
      alert(`hola ${this.username}`)
      window.location.href = 'https://www.google.com';
    },
    error =>{
      alert(`${error.error.error}`)
     console.log("error al iniciar sesion", error) 
    })
  }
}
