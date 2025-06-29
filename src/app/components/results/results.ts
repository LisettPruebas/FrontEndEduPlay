import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Puntaje } from '../../services/puntaje/puntaje';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.html',  
  styleUrl: './results.css'
})
export class Results implements OnInit {
  puntos: number = 0
  nombre: string = '';
  // Variables para guardar el puntaje y el nombre del jugador que se mostrarán en la vista.

  constructor(private router: Router, private puntajeservice: Puntaje) {}

  ngOnInit(): void {
    this.puntos = this.puntajeservice.getPuntaje()
    this.nombre = this.puntajeservice.getNombreJugador();
    // Al iniciar el componente, obtiene el puntaje y nombre guardados en el servicio y los asigna a las variables.
  }
  playAgain() {
    this.router.navigate(['/preguntas']); //Método para redirigir al usuario a la ruta /preguntas para jugar otra vez.


  }

   exitGame() {
    this.router.navigate(['']); //Método para redirigir al inicio o pantalla principal (ruta vacía).
  }

}
