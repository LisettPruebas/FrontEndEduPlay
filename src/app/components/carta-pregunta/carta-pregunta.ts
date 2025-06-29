import { Component, OnInit } from '@angular/core';
// Component: Decorador que convierte una clase en un componente Angular.
// OnInit: Interfaz que permite ejecutar algo cuando el componente se inicia (usás ngOnInit()).
import { CommonModule } from '@angular/common';
// Importa funcionalidades comunes como ngIf, ngFor, etc.
// Necesario cuando el componente es standalone y no está en un módulo que ya importe CommonModule.
import { Pregunta } from '../../modelos/pregunta.model'; //Importa el modelo Pregunta
import { PuntosResultado } from '../../modelos/puntosResultado.model';
import { Router } from '@angular/router'; //Angular te da esta clase para navegar entre rutas
import { Puntaje } from '../../services/puntaje/puntaje';
import { HttpClient } from '@angular/common/http';
//Es el servicio de Angular que se usa para hacer peticiones HTTP (GET, POST, etc.) al backend.
import { firstValueFrom } from 'rxjs';
//Convierte un Observable (que es lo que devuelve HttpClient) en una Promise que podés usar con await.

@Component({
  selector: 'app-carta-pregunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carta-pregunta.html',
  styleUrls: ['./carta-pregunta.css']
 
})

export class CartaPreguntaComponent implements OnInit {

  constructor(private router: Router, private puntajeservices: Puntaje, private http: HttpClient) {}
  
  pregunta!: Pregunta; //guardará la pregunta que traemos del backend.

  // son propiedades (o atributos) de la clase CartaPreguntaComponent:

  respuestaUsuario: string = ''; //guarda la opción que eligió el usuario. Se limpia después de cada pregunta.
  mensajeFeedback: string = ''; //Muestra un mensaje al usuario como: "Correcta" o "Incorrecta".
  esCorrecta: boolean = false; //Guarda si la respuesta del usuario fue correcta (true) o no (false)
  contadorCorrectas: number = 0; //Cuenta cuántas respuestas correctas lleva el usuario. Se usa para calcular el puntaje total (correctas * 10)
  contadorTotal: number = 1; //Cuenta cuántas preguntas se han respondido.
  resultado! : PuntosResultado;
  //PuntosResultado (una interfaz que define el tipo de datos esperados del backend al guardar puntaje).

  // !: es el non-null assertion operator, que le dice a TypeScript:
  // 👉 “Confía en mí, esta variable se va a inicializar antes de que se use”.
  // Se asigna cuando el backend responde con la puntuación del jugador.
  puntosTotales: number = 0; //Suma total de puntos del jugador (10 puntos por cada correcta).Se envía al backend cuando termina el juego.

  ngOnInit(): void {
    
    this.obtenerPregunta(); //Cuando inicia el componente, carga la primera pregunta del backend.
  }

  async obtenerPregunta(): Promise<boolean> { //retorna una promesa. El tipo Promise<boolean> indica que la función devuelve una promesa que, cuando se resuelve, entregará un valor booleano (true o false).
    let res: boolean = false;
    try { //Dentro de try ponés el código que puede fallar.
      this.pregunta = await firstValueFrom(this.http.get<Pregunta>('http://localhost:3000/pregunta/traer'));
      //Usa firstValueFrom para transformar el Observable que devuelve http.get en una Promise, así podés usar await y escribir un código más secuencial y legible.
      res = true;
      //Definís una variable res que usás para indicar si la petición fue exitosa (true) o fallida (false). Por defecto la inicializás en false.
    } catch (error) { //Si hay un error, se ejecuta el catch.
      console.error('Error al obtener la pregunta:', error);
    }
    finally{ //El finally se ejecuta siempre (pase lo que pase).
      return res;
    }
  }
 // se tendria que haber usado en el service de esta forma: 
  // obtenerPregunta(): Observable<Pregunta> {
  //   return this.http.get<Pregunta>('http://localhost:3000/pregunta/traer');
  // }

  // y en el componente: 
  // obtenerPregunta(): void {
  //   this.preguntasService.obtenerPregunta().subscribe({
  //     next: (pregunta) => {
  //       this.pregunta = pregunta;
  //     },
  //     error: (err) => {
  //       console.error('Error al obtener la pregunta:', err);
  //     }
  //   });
  // }

  //   ¿Por qué poner las peticiones HTTP en el service?
  // 1. Separación de responsabilidades (principio SOLID - SRP)
  // El service se encarga de comunicarse con el backend: hacer peticiones, transformar datos, manejar URLs. El componente se encarga de mostrar datos y manejar la interacción del usuario, esto hace que cada parte tenga un único objetivo claro.

  async verificarRespuesta(opcion: string):Promise<void> {
    // Método asíncrono que recibe la opción que eligió el usuario (opcion).
    // Retorna una promesa que no devuelve nada (void).
   
    this.respuestaUsuario = opcion;
    // Guarda la opción elegida en respuestaUsuario.
    this.esCorrecta = opcion === this.pregunta.respuestaCorrecta;
    // Compara si esa opción es igual a la respuesta correcta de la pregunta actual.
    // Guarda el resultado (true o false) en esCorrecta.

    if (this.esCorrecta) {
      this.contadorCorrectas++;
      this.puntosTotales += 10; 
      this.mensajeFeedback = 'Correcta';
      // Si la respuesta fue correcta:
      // Incrementa el contador de respuestas correctas.
      // Suma 10 puntos al total.
      // Muestra mensaje "Correcta".
    } else {
      this.mensajeFeedback = 'Incorrecta';
    }

  
    if (this.contadorTotal === 10) {
      let res = await this.enviarPuntos(); 
      //Llama a la función enviarPuntos() para mandar la puntuación al backend y espera su resultado.
      if (res) { //Si fue exitoso (res == true):
        this.puntajeservices.setpuntaje(this.puntosTotales)
        // Guarda el puntaje total en el servicio de puntajes.
        setTimeout(() => {
          this.router.navigate(['/resultados'])
        }, 2000)
        // Después de 2 segundos, navega a la página de resultados.
      }
      return; //Termina la función (return) para no seguir cargando preguntas.
    }
    
    if(this.contadorTotal <= 9){
        this.contadorTotal++;
      }
      // Si aún no llegaron a 10 preguntas, incrementa el contador total para la siguiente pregunta.

    setTimeout( async () => {
      await this.obtenerPregunta();
      this.mensajeFeedback = '';
      this.respuestaUsuario = '';
    }, 500);
  }
  // Después de medio segundo (500 ms), hace lo siguiente:
  // Llama a obtenerPregunta() para cargar una nueva pregunta.
  // Limpia el mensaje de feedback para que no se muestre más.
  // Limpia la respuesta del usuario para poder responder otra vez.
  
  async enviarPuntos(): Promise<boolean> {
    let res = false;
    // Variable para almacenar si la petición fue exitosa. Inicialmente es false.
    const body = {
      puntos: this.contadorCorrectas * 10,
      nombre: this.puntajeservices.getNombreJugador(),
    };
    // Arma un objeto con:
    // puntos: cantidad total de puntos (10 por cada respuesta correcta).
    // nombre: obtiene el nombre del jugador desde el servicio puntajeservices.

    try {
      this.resultado = await firstValueFrom(
        this.http.post<PuntosResultado>(
          'http://localhost:3000/pregunta/puntuacion',
          body //Hace un POST a la URL /pregunta/puntuacion enviando body como datos.
        )
      );
      //Usa firstValueFrom para convertir el Observable en Promise y espera la respuesta con await
      res = true;
    
    } catch (error) {
      console.error('Error al guardar los puntos:', error);
    }
    finally {
      return res;
    }
  }
}

// ¿Qué es finally?
// finally es una parte opcional del bloque try/catch/finally en JavaScript y TypeScript.
// Se ejecuta siempre, pase lo que pase:
// Si el código en el try funciona → se ejecuta finally.
// Si se lanza un error y entra al catch → se ejecuta finally.
// Incluso si dentro del try o catch hay un return, el finally se ejecuta antes de que salga.

// ¿Por qué usar finally en tu código?
// Porque queremos garantizar que se devuelva res (true o false), tanto si la petición fue exitosa como si falló.

// ¿Se podría no usar finally?
// Sí. Podrías poner return true en el try y return false en el catch, pero sería más largo y menos limpio.

