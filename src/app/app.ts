import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Results } from './componets/results/results';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Results],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FrontEndEduplay';
}
