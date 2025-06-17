import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartaPreguntaComponent } from "./components/carta-pregunta/carta-pregunta";
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header, CartaPreguntaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FrontEndEduplay';
}
