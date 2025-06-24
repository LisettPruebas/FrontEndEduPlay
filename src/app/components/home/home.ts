import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '../input/input';

@Component({
  selector: 'app-home',
  imports: [RouterModule,Input],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  

}
