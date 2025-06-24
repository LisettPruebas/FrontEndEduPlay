import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterModule,CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header{

constructor(public auth: Auth, private router: Router, private http: HttpClient) {}


 logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
  esAdmin(): boolean {
    return this.auth.isLoggedIn() && this.auth.getUser() === 'admin';
 }

  mostrarBotonReiniciar(): boolean {
    return this.auth.isLoggedIn() && this.auth.getUser() === 'admin' && this.router.url === '/ranking';
  }

  reiniciarRanking() {
  if (confirm('¿Estás seguro de que deseas reiniciar el ranking?')) {
    this.http.delete('http://127.0.0.1:3000/score/reiniciar')
      .subscribe({
        next: () => alert('Ranking reiniciado correctamente'),
        error: () => alert('Hubo un error al reiniciar el ranking')
      });
    }
  }

}
