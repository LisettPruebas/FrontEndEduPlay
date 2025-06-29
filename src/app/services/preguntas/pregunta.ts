
import { Injectable } from '@angular/core';
//Importa el decorador @Injectable, que le dice a Angular que esta clase puede inyectarse en otros componentes o servicios.
import { HttpClient } from '@angular/common/http';
//que sirve para hacer peticiones HTTP (GET, POST, DELETE, PUT).
import { Observable } from 'rxjs'
//una forma de manejar datos asincrónicos en Angular
// RxJS (Reactive Extensions for JavaScript) es una biblioteca de programación reactiva para JavaScript.
// ✨ Sirve para trabajar con datos asincrónicos y eventos como si fueran flujos de datos (streams). Es la base de los Observables en Angular.

export interface Pregunta {
  _id?: string; //ID de la pregunta (opcional).
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
  //Se inyecta el HttpClient para poder usarlo en los métodos y hacer peticiones HTTP.

  obtenerPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.baseUrl}/traerTodas`);
  }
  //Hace un GET a /pregunta/traerTodas y devuelve un Observable con un array de Pregunta.

  crearPregunta(pregunta: Pregunta): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, pregunta); 
  }
  //Envía una pregunta nueva al servidor con POST. Le pasa un objeto Pregunta.

  eliminarPregunta(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  //Borra una pregunta por su ID. Ejemplo: http://127.0.0.1:3000/pregunta/123

  actualizarPregunta(id: string, pregunta: Pregunta): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, pregunta);
}

}

// Un Observable es una forma de manejar datos asincrónicos. Es como una fuente de datos que puede emitir uno o varios valores con el tiempo. Y Usamos Observables principalmente porque las operaciones con el backend (y otras) son asincrónicas.
// ¿Por qué los métodos GET (como http.get) devuelven un Observable?
// Porque cuando hacés una petición HTTP, no sabés cuándo va a responder el servidor. Podría tardar 1 segundo, 5, o fallar.Entonces Angular te da un Observable para que vos:
// Te suscribas a la respuesta.Con .subscribe(...), te "anotás" para que te avise cuando llegue la respuesta y Cuando el servidor responde, se ejecuta lo que está dentro del subscribe.

// obtenerPreguntas(): Observable<Pregunta[]> {
//   return this.http.get<Pregunta[]>(`${this.baseUrl}/traerTodas`);
// }
// 👉 Acá el método no llama a .subscribe() porque no está ejecutando la petición todavía. Lo único que hace es crear y devolver el Observable, para que el componente que lo usa decida cuándo suscribirse.

// ¿Por qué hacerlo así?
// Porque los servicios no deberían ejecutar directamente las cosas (como .subscribe()).
// En Angular, se sigue el principio de responsabilidad única:
// Capa	Responsabilidad
// Servicio	Prepara la petición (devuelve el Observable)
// Componente	Se suscribe y maneja la respuesta

// ¿Por qué está mal usar any?
// any en TypeScript significa: “No me importa el tipo de este valor, puede ser cualquier cosa.”

// 📉 Problemas de usar any:
// Perdés el tipado fuerte de TypeScript y No te avisa si usás mal una propiedad o función.
// ⚠️ Usar any es como decirle a TypeScript:
// “Callate, yo sé lo que hago”, aunque no lo sepas 😅

//  ¿Por qué se usó any?
// Porque el autor no sabía (o no le importó) qué devuelve el backend.
// Usó any como una solución rápida para evitar errores de tipos.

// ¿Cómo se puede mejorar?
// Lo ideal sería crear una interfaz que represente la respuesta del backend.

// Por ejemplo:
// export interface RespuestaServidor {
//   mensaje: string;
//   success: boolean;
//   data?: any; // o un tipo más específico
// }

// crearPregunta(pregunta: Pregunta): Observable<RespuestaServidor> {
//   return this.http.post<RespuestaServidor>(`${this.baseUrl}/crear`, pregunta); 
// }

// ¿Qué significa que un lenguaje sea tipado fuerte?
// Un lenguaje tipado fuerte no te deja mezclar tipos de datos sin ser muy claro o hacer una conversión explícita. 🌟 Es como tener reglas claras:
// “Si estás manejando un número, no podés tratarlo como un texto sin decirlo claramente.”