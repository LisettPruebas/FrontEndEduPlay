import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Puntaje {

  private puntosTotales: number = 0;
  private nombreJugador: string = 'anonimo';

  setpuntaje(puntos:number): void{
    this.puntosTotales = puntos
  }

  getPuntaje(): number{
    return this.puntosTotales;
  }

  setNombreJugador(nombre: string): void {
    this.nombreJugador = nombre.trim() || 'anonimo';
  }
  getNombreJugador(): string {
    return this.nombreJugador;
  }

  constructor() { }
}

