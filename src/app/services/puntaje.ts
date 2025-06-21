import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Puntaje {

  private puntosTotales: number = 0;

  setpuntaje(puntos:number): void{
    this.puntosTotales = puntos
  }

  getPuntaje(): number{
    return this.puntosTotales;
  }

  constructor() { }
}

