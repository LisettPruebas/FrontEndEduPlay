import { Component } from '@angular/core';

import { Preguntas } from './preguntas/preguntas/pregurtasAdmin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ Preguntas],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected title = 'FrontEndEduplay';
}
