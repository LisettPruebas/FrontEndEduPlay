import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pregunta } from '../../modelos/pregunta.model';
import { PuntosResultado } from '../../modelos/puntosResultado.model';
import { Router } from '@angular/router';
import { Puntaje } from '../../services/puntaje/puntaje';


@Component({
  selector: 'app-carta-pregunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carta-pregunta.html',
  styleUrls: ['./carta-pregunta.css']
 
})

export class CartaPreguntaComponent implements OnInit {

  constructor(private router: Router, private puntajeservices: Puntaje) {}
  
  pregunta!: Pregunta;

  respuestaUsuario: string = '';
  mensajeFeedback: string = '';
  esCorrecta: boolean = false;
  contadorCorrectas: number = 0;
  contadorTotal: number = 0;
  resultado! : PuntosResultado;
  puntosTotales: number = 0;

  ngOnInit(): void {
    document.body.style.backgroundColor = '#F7EB33';
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

  async verificarRespuesta(opcion: string):Promise<void> {
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
    let res = await this.enviarPuntos(); 
    if (res) {
      this.puntajeservices.setpuntaje(this.puntosTotales)
      this.router.navigate(['/resultados'])}
    return;
  }

  setTimeout(() => {
    this.obtenerPregunta();
    this.mensajeFeedback = '';
    this.respuestaUsuario = '';
  }, 500);
}


  
   async enviarPuntos(): Promise<Boolean> {
    let res : Boolean = false;
    try {
      const response = await fetch('http://localhost:3000/pregunta/puntuacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ puntos: this.contadorCorrectas * 10,
          nombre: this.puntajeservices.getNombreJugador()
         }), 
      });

      this.resultado = await response.json();
      res = true;
      console.log('puntos:', this.resultado.puntaje);

    } catch (error) {
      console.error('Error al guardar los puntos:', error);
    }
    finally {
      return res;
    }
  }

}





