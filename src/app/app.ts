import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected title = 'FrontEndEduplay';
}
