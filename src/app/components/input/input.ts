import { Component } from '@angular/core';
import { Puntaje } from '../../services/puntaje/puntaje';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class Input {
  nombre:string = '';

  constructor(private puntajeservice: Puntaje) { }

guardarNombre(nombre: string): void {
    this.puntajeservice.setNombreJugador(nombre.trim());
    console.log('Nombre guardado:', this.puntajeservice.getNombreJugador());
  }

}
