import { Component } from '@angular/core';
import { ListarPreguntas } from "./components/listar-preguntas/listar-preguntas";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListarPreguntas,HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected title = 'FrontEndEduplay';
}
