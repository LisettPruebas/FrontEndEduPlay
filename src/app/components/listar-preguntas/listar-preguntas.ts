import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasService, Pregunta } from '../../services/preguntas/pregunta';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-preguntas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './listar-preguntas.html',
  styleUrls: ['./listar-preguntas.css']
})
export class ListarPreguntas implements OnInit {
  preguntas: Pregunta[] = [];

  formulario!: FormGroup;

  constructor(private preguntasService: PreguntasService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerPreguntas();

    // Inicializamos el formulario con 4 controles de opción
    this.formulario = this.fb.group({
      pregunta: ['', Validators.required],
      opciones: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
      respuestaCorrecta: ['', Validators.required]
    });
  }

  get opciones() {
    return this.formulario.get('opciones') as FormArray;
  }

  obtenerPreguntas() {
    this.preguntasService.obtenerPreguntas().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.preguntas = data;
        } else if (data && typeof data === 'object' && !Array.isArray(data)) {
          const values = Object.values(data).filter(v => typeof v === 'object') as Pregunta[];
          if (values.length > 0 && 'pregunta' in values[0]) {
            this.preguntas = values;
          } else if ('pregunta' in data) {
            this.preguntas = [data as Pregunta];
          } else {
            this.preguntas = [];
          }
        } else {
          this.preguntas = [];
        }
      },
      error: (err) => console.error('Error al obtener preguntas', err)
    });
  }

  crearPregunta() {
    if (this.formulario.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const nuevaPregunta: Pregunta = {
      pregunta: this.formulario.value.pregunta,
      opciones: this.formulario.value.opciones,
      respuestaCorrecta: this.formulario.value.respuestaCorrecta
    };

    // Validaciones extras (opcional)
    const opcionesValidas = nuevaPregunta.opciones.every(opt => opt.trim() !== '');
    if (!opcionesValidas) {
      alert('Todas las opciones deben estar completas');
      return;
    }

    const opcionesUnicas = new Set(nuevaPregunta.opciones.map(opt => opt.trim().toLowerCase()));
    if (opcionesUnicas.size !== nuevaPregunta.opciones.length) {
      alert('Las opciones deben ser distintas entre sí');
      return;
    }

    const respuestaCoincide = nuevaPregunta.opciones
      .map(opt => opt.trim().toLowerCase())
      .includes(nuevaPregunta.respuestaCorrecta.trim().toLowerCase());
    if (!respuestaCoincide) {
      alert('La respuesta correcta debe coincidir exactamente con una de las opciones');
      return;
    }

    this.preguntasService.crearPregunta(nuevaPregunta).subscribe({
      next: () => {
        alert('Pregunta creada con éxito');
        this.formulario.reset();
        // Reiniciar opciones para que tengan 4 controles vacíos
        while (this.opciones.length) {
          this.opciones.removeAt(0);
        }
        for (let i = 0; i < 4; i++) {
          this.opciones.push(this.fb.control('', Validators.required));
        }
      },
      error: (err) => {
        console.error('Error al crear pregunta', err);
        alert('Error al crear la pregunta');
      }
    });
  }

  eliminar(id?: string) {
    if (!id) {
      alert('ID inválido');
      return;
    }
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
