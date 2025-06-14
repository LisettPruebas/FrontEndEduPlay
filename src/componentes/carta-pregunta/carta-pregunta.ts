import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pregunta } from '../../app/modelos/pregunta.model.js';


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

      if(this.esCorrecta){
        this.contadorCorrectas++;
        this.mensajeFeedback = 'Correcta'

      }else{
        this.mensajeFeedback = 'Incorrecta'
      }

      if(this.contadorTotal == 5){
        return 
      }

      setTimeout( () => {
        this.obtenerPregunta();
        this.mensajeFeedback = '';
        this.respuestaUsuario = '';
      }, 2000)
      
  }

}





/*import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../../app/modelos/pregunta.model.js';

@Component({
  selector: 'app-carta-pregunta',
  templateUrl: './carta-pregunta.html',
  styleUrls: ['./carta-pregunta.css']
})

export class CartaPreguntaComponent implements OnInit {

  pregunta!: Pregunta

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
  }*/

/*export class CartaPreguntaComponent implements OnInit {

  pregunta!: Pregunta;

  ngOnInit(): void {
    this.obtenerPregunta();
  }

  async obtenerPregunta(): Promise<void> {
    const response = await fetch('http://localhost:3000/pregunta/traer');
    this.pregunta = await response.json();
    console.log('Pregunta:', this.pregunta);
  }
}*/
