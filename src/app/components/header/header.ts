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
  
  reiniciarRanking() {
    if (confirm('¿Estás seguro de que deseas reiniciar el ranking?')) {
      this.http.delete('http://127.0.0.1:3000/score/reiniciar')
        .subscribe({
          next: () => {
            alert('Ranking reiniciado correctamente');
            window.location.reload();
          },
          error: () => alert('Hubo un error al reiniciar el ranking')
        });
    }
  }

}

//  ¿Qué es lo que no está tan bien?
// El método reiniciarRanking() está haciendo una llamada HTTP directamente en el componente, usando HttpClient. Esto viola el principio de separación de responsabilidades, porque el componente debería mostrar y manejar la interfaz, no encargarse de detalles técnicos como hacer peticiones a la API.

//esto en un service:
//  reiniciarRanking(): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/reiniciar`);
//   }
// }

//esto en el componente:
// reiniciarRanking() {
//     if (confirm('¿Estás seguro de que deseas reiniciar el ranking?')) {
//       this.rankingService.reiniciarRanking().subscribe({
//         next: () => {
//           alert('Ranking reiniciado correctamente');
//           window.location.reload();
//         },
//         error: () => alert('Hubo un error al reiniciar el ranking')
//       });
//     }
//   }
// }