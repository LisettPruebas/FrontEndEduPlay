import { Component } from '@angular/core';
import { ListarPreguntas } from "./components/listar-preguntas/listar-preguntas";
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ListarPreguntas, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected title = 'FrontEndEduplay';
}
