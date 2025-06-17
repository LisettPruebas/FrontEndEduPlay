import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Results } from './components/results/results';
import { CartaPreguntaComponent } from "./components/carta-pregunta/carta-pregunta";
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header, CartaPreguntaComponent, Results],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FrontEndEduplay';
}
