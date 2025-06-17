import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pregunta } from '../modelos/pregunta.model';
import { PuntosResultado } from '../modelos/puntosResultado.model';


@Component({
  selector: 'app-carta-pregunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carta-pregunta.html',
  styleUrls: ['./carta-pregunta.css']
 
})

export class CartaPreguntaComponent implements OnInit {

  pregunta!: Pregunta;

  respuestaUsuario: string = '';
  mensajeFeedback: string = '';
  esCorrecta: boolean = false;
  contadorCorrectas: number = 0;
  contadorTotal: number = 0;
  resultado! : PuntosResultado;
  puntosTotales: number = 0;

  ngOnInit(): void {
    this.obtenerPregunta();
    
  }

  async obtenerPregunta(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/pregunta/traer');
      this.pregunta = await response.json();
      console.log('Pregunta:', this.pregunta);
    } catch (error) {
      console.error('Error al obtener la pregunta:', error);
    }
  }

  verificarRespuesta(opcion: string): void {
  this.contadorTotal++;
  this.respuestaUsuario = opcion;
  this.esCorrecta = opcion === this.pregunta.respuestaCorrecta;

  if (this.esCorrecta) {
    this.contadorCorrectas++;
    this.puntosTotales += 10; 
    this.mensajeFeedback = 'Correcta';
    console.log(this.puntosTotales)
  } else {
    this.mensajeFeedback = 'Incorrecta';
  }

 
  if (this.contadorTotal === 10) {
    this.enviarPuntos(); 
    return;
  }

  setTimeout(() => {
    this.obtenerPregunta();
    this.mensajeFeedback = '';
    this.respuestaUsuario = '';
  }, 2000);
}


  
   async enviarPuntos(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/score/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ puntos: this.contadorCorrectas * 10 }), 
      });

      this.resultado = await response.json();
      console.log('puntos:', this.resultado.puntaje);
    } catch (error) {
      console.error('Error al guardar los puntos:', error);
    }
  }

}





