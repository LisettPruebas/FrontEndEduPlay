
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la estructura de una pregunta
export interface Pregunta {
  _id?: string;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private baseUrl = 'http://127.0.0.1:3000/pregunta';

  constructor(private http: HttpClient) { }

  obtenerPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.baseUrl}/traerTodas`);
  }

  crearPregunta(pregunta: Pregunta): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, pregunta); 
  }

  eliminarPregunta(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
