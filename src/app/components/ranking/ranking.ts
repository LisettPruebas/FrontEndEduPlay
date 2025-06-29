import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Jugador {
  nombre: string;
  puntos: number;
};
//La mejor práctica es que las interfaces como Jugador, Pregunta, PuntosResultado y similares estén definidas en archivos separados dentro de una carpeta models o modelos.

@Component({
  selector: 'app-ranking',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})
export class Ranking implements OnInit {

  puntajes: Jugador[] = [];
  constructor (private http: HttpClient) {}
  ngOnInit() { //ngOnInit() es el momento ideal para inicializar datos cuando un componente se carga.
    this.http.get<any[]>('http://127.0.0.1:3000/score/ranking') //Esa llamada devuelve un Observable que emite un arreglo (array) de datos.
    .subscribe(datos => { //Te suscribís con .subscribe(...) para recibir los datos cuando llegan.
      this.puntajes = datos
      // Cuando llegan, asignás esos datos a la variable this.puntajes para usarlos en el componente.
    })
  }
}

// Por qué debería estar la llamada HTTP en un service?
// Separar la llamada HTTP en un servicio tiene varias ventajas:
// Responsabilidad única:
// El componente solo se preocupa por la UI y la lógica de presentación.
// El servicio se ocupa de la lógica de datos y comunicación con backend.

// Reutilización: Otros componentes pueden llamar al mismo servicio sin repetir código.
// Facilita testing: Es más fácil hacer pruebas unitarias cuando la lógica de datos está separada.
// Mantiene el componente limpio y legible.

// ¿Entonces cómo combinar ambos?
// El servicio tiene un método que hace la llamada HTTP y devuelve un Observable.

// // ranking.service.ts
// getRanking(): Observable<Jugador[]> {
//   return this.http.get<Jugador[]>('http://127.0.0.1:3000/score/ranking');
// }

// ngOnInit() {
//   this.rankingService.getRanking()
//     .subscribe(datos => this.puntajes = datos);
// }


// Por qué usás .subscribe() en el componente:
// Cuando llamás a http.get() (o a un método del servicio que devuelve un Observable), ese Observable no hace nada hasta que alguien se suscribe. El componente es el que necesita los datos para mostrarlos, entonces es quien se suscribe para recibirlos.

// Es habitual que el componente se suscriba porque es el que maneja la UI y reacciona cuando llegan los datos.