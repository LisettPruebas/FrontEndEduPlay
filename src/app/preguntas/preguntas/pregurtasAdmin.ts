import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreguntasService, Pregunta } from '../../servicios/preguntas';

@Component({
  selector: 'app-preguntas',
  standalone: true, 
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: 'preguntas.html',
  styleUrls: ['./preguntas.css'] 
})
export class Preguntas {
  preguntas: Pregunta[] = [];

  nuevaPregunta: Pregunta = {
    pregunta: '',
    opciones: ['', '', '', ''],
    respuestaCorrecta: ''
  };

  constructor(private preguntasService: PreguntasService) {}

  ngOnInit() {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.preguntasService.obtenerPreguntas().subscribe(data => {
      this.preguntas = data;
    });
  }

  agregarPregunta() {
    this.preguntasService.crearPregunta(this.nuevaPregunta).subscribe(() => {
      this.cargarPreguntas();
      this.nuevaPregunta = {
        pregunta: '',
        opciones: ['', '', '', ''],
        respuestaCorrecta: ''
      };
    });
  }

  eliminarPregunta(id: number) {
    this.preguntasService.eliminarPregunta(id).subscribe(() => {
      this.cargarPreguntas();
    });
  }
}
