import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { CartaPreguntaComponent } from './components/carta-pregunta/carta-pregunta';
import { Results } from './components/results/results';

export const routes: Routes = [
    {path:'',component:Home},
    {path:"login",component: LoginComponent},
    {path: "preguntas", component: CartaPreguntaComponent},
    {path: "resultados", component: Results}
];
