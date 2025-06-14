import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasService, Pregunta } from '../../servicios/preguntas';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-preguntas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './listar-preguntas.html',
  styleUrls: ['./listar-preguntas.css']
})
export class ListarPreguntas implements OnInit{
  preguntas: Pregunta[] = [];

  // Modelo para el formulario
  nuevaPregunta: Pregunta = {
    pregunta: '',
    opciones: ['', '', '', ''], // 4 opciones por defecto
    respuestaCorrecta: ''
  };

  constructor(private preguntasService: PreguntasService) {}

  ngOnInit(): void {
    this.obtenerPreguntas();
  }

  obtenerPreguntas() {
    this.preguntasService.obtenerPreguntas().subscribe({
    next: (data) => {
      if (Array.isArray(data)) {
        // data ya es un array
        this.preguntas = data;
      } else if (data && typeof data === 'object' && !Array.isArray(data)) {
        // data es un objeto, convertimos sus valores en array
        const values = Object.values(data).filter(v => typeof v === 'object') as Pregunta[];
        if (values.length > 0 && 'pregunta' in values[0]) {
          this.preguntas = values;
        } else if ('pregunta' in data) {
          this.preguntas = [data as Pregunta];
        } else {
          this.preguntas = [];
        }
      } else {
        // data no es array ni objeto válido
        this.preguntas = [];
      }
    },
    error: (err) => console.error('Error al obtener preguntas', err)
  });

  }

  crearPregunta() {
    // Validar que pregunta y respuesta estén completas
    if (!this.nuevaPregunta.pregunta.trim()) {
      alert('La pregunta no puede estar vacía');
      return;
    }
    if (!this.nuevaPregunta.respuestaCorrecta.trim()) {
      alert('Debe indicar la respuesta correcta');
      return;
    }
    // Validar que las opciones no estén vacías
    const opcionesValidas = this.nuevaPregunta.opciones.every(opt => opt.trim() !== '');
    if (!opcionesValidas) {
      alert('Todas las opciones deben estar completas');
      return;
    }

    this.preguntasService.crearPregunta(this.nuevaPregunta).subscribe({
      next: (resp) => {
        alert('Pregunta creada con éxito');
        this.nuevaPregunta = { pregunta: '', opciones: ['', '', '', ''], respuestaCorrecta: '' };
        this.obtenerPreguntas();
      },
      error: (err) => {
        console.error('Error al crear pregunta', err);
        alert('Error al crear la pregunta');
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que querés eliminar esta pregunta?')) {
      this.preguntasService.eliminarPregunta(id).subscribe({
        next: () => {
          alert('Pregunta eliminada');
          this.obtenerPreguntas();
        },
        error: (err) => {
          console.error('Error al eliminar pregunta', err);
          alert('Error al eliminar la pregunta');
        }
      });
    }
  }
}


