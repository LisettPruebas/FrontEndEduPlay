import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartaPreguntaComponent } from "../components/carta-pregunta/carta-pregunta";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartaPreguntaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FrontEndEduplay';
}
