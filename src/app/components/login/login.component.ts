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
    const credenciales = {username: this.username, password:this.password};
    this.loginService.login(credenciales).subscribe( response => {
      this.auth.setLoginState(this.username);
      this.router.navigate(['/admin']);
    },
    error =>{
      this.mensaje = error.error.error;
    })
  }
}
