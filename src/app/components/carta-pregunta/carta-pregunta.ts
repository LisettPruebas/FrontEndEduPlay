import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Pregunta } from '../../modelos/pregunta.model';
import { PuntosResultado } from '../../modelos/puntosResultado.model';
import { Router, RouterModule } from '@angular/router';
import { Puntaje } from '../../services/puntaje/puntaje';


@Component({
  selector: 'app-carta-pregunta',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule 
  ],
  templateUrl: './carta-pregunta.html',
  styleUrls: ['./carta-pregunta.css'],
})
export class CartaPreguntaComponent implements OnInit {
  http: any;

  constructor(
    private router: Router,
    private puntajeservices: Puntaje,
    private httpClient: HttpClient
  ) {}

  pregunta!: Pregunta;

  respuestaUsuario: string = '';
  mensajeFeedback: string = '';
  esCorrecta: boolean = false;
  contadorCorrectas: number = 0;
  contadorTotal: number = 1;
  resultado!: PuntosResultado;
  puntosTotales: number = 0;

  ngOnInit(): void {
    this.obtenerPregunta();
  }

  async obtenerPregunta(): Promise<boolean> {
    let res: boolean = false;
    try {
      this.pregunta = await firstValueFrom(
        this.httpClient.get<Pregunta>('http://localhost:3000/pregunta/traer')
      );
      console.log('Pregunta:', this.pregunta);
      res = true;
    } catch (error) {
      console.error('Error al obtener la pregunta:', error);
    }
    return res;
  }

  async verificarRespuesta(opcion: string): Promise<void> {
    this.respuestaUsuario = opcion;
    this.esCorrecta = opcion === this.pregunta.respuestaCorrecta;

    if (this.esCorrecta) {
      this.contadorCorrectas++;
      this.puntosTotales += 10;
      this.mensajeFeedback = 'Correcta';
    } else {
      this.mensajeFeedback = 'Incorrecta';
    }
 
  if (this.contadorTotal === 10) {
    let res = await this.enviarPuntos(); 
    if (res) {
      this.puntajeservices.setpuntaje(this.puntosTotales)
      setTimeout(() => {
        this.router.navigate(['/resultados'])
      }, 2000)
    }
    return;
  }
   
   if(this.contadorTotal <= 9){
      this.contadorTotal++;
    }

  setTimeout( async () => {
     await this.obtenerPregunta();
    this.mensajeFeedback = '';
    this.respuestaUsuario = '';
  }, 500);
}

  async enviarPuntos(): Promise<boolean> {
    let res = false;
    const body = {
      puntos: this.contadorCorrectas * 10,
      nombre: this.puntajeservices.getNombreJugador(),
    };

    try {
      this.resultado = await firstValueFrom(
        this.httpClient.post<PuntosResultado>(
          'http://localhost:3000/pregunta/puntuacion',
          body
        )
      );
      console.log('Puntos:', this.resultado.puntaje);
      res = true;
    } catch (error) {
      console.error('Error al guardar los puntos:', error);
    }
    return res;
  }
}
