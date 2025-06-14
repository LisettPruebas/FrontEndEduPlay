import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la estructura de una pregunta
export interface Pregunta {
  id?: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
}

@Injectable({
  providedIn: 'root'  // Servicio singleton disponible en toda la app
})
export class PreguntasService {
  private baseUrl = 'http://127.0.0.1:3000/pregunta';

  constructor(private http: HttpClient) { }

  // Obtener todas las preguntas
  obtenerPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.baseUrl);
  }

  // Crear una pregunta nueva
  crearPregunta(pregunta: Pregunta): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, pregunta);
  }

  // Eliminar pregunta por id
  eliminarPregunta(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
