import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { CartaPreguntaComponent } from './components/carta-pregunta/carta-pregunta';
import { Results } from './components/results/results';
import { ListarPreguntas } from './components/listar-preguntas/listar-preguntas';
import { AdminGuard } from './services/auth/admin.guard';

export const routes: Routes = [
    {path:'',component:Home},
    {path:"login",component: LoginComponent},
    {path: "preguntas", component: CartaPreguntaComponent},
    {path: "resultados", component: Results},
    {path: "admin", component: ListarPreguntas},
    {path: 'admin', component: ListarPreguntas, canActivate: [AdminGuard] }
];
