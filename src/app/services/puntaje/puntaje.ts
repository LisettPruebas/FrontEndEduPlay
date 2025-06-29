import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
  //significa que es un singleton, es decir, hay una única instancia en toda la app.
})
export class Puntaje {

  private puntosTotales: number = 0;
  private nombreJugador: string = 'anonimo';
  // Variables internas privadas que mantienen el estado.

  setpuntaje(puntos:number): void{
    this.puntosTotales = puntos
  }

  getPuntaje(): number{
    return this.puntosTotales;
  }

  // Métodos para modificar y leer los puntos.

  setNombreJugador(nombre: string): void {
    this.nombreJugador = nombre.trim() || 'anonimo';
  }
  getNombreJugador(): string {
    return this.nombreJugador;
  }

  constructor() { }
}

// Métodos para modificar y leer el nombre del jugador, con validación para evitar cadenas vacías.

// ¿Por qué tu clase Puntaje es un servicio?
// Guarda y maneja datos que deben ser accesibles desde varios componentes, guarda el puntaje y el nombre del jugador. Como los datos pueden necesitarse en diferentes componentes (por ejemplo, en la pantalla de preguntas y en la de resultados), el servicio centraliza ese estado.

// Por qué no poner esto dentro de un componente?
// Si el puntaje y el nombre estuvieran solo en un componente, no podrías compartir esos datos fácilmente con otros componentes.

// ¿Qué es next?
// Cuando te suscribes a un Observable con:

// observable.subscribe({
//   next: valor => { /* aquí recibo cada valor emitido */ },
//   error: err => { /* aquí manejo errores */ },
//   complete: () => { /* aquí cuando el Observable termina */ }
// });
// next es una función que se ejecuta cada vez que el Observable emite un nuevo valor. Es donde recibís y procesás esos valores. En otras palabras:
// Cuando el Observable (por ejemplo, una llamada HTTP) responde con datos, el callback next recibe esos datos.

// Por eso en tu código:

// .subscribe({
//   next: datos => this.puntajes = datos,
//   error: err => console.error('Error al cargar ranking:', err)
// });
// next recibe los datos que llegan y los asigna a this.puntajes.

// ¿Qué pasa si no usás un objeto con next?
// También podés usar el método .subscribe() con funciones directas:

// observable.subscribe(
//   datos => { /* next */ },
//   err => { /* error */ },
//   () => { /* complete */ }
// );
// Pero usar el objeto con next, error y complete es más claro y legible.