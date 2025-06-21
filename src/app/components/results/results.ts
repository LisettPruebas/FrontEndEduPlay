import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.html',  
  styleUrl: './results.css'
})
export class Results {

  constructor(private router: Router) {}

  playAgain() {
    // Redirige al inicio del juego
    this.router.navigate(['/game']);
  }

   exitGame() {
    // Redirige a la pantalla de inicio o salir de la app
    this.router.navigate(['/home']);
  }

}
