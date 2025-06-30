import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { CartaPreguntaComponent } from './components/carta-pregunta/carta-pregunta';
import { Results } from './components/results/results';
import { ListarPreguntas } from './components/listar-preguntas/listar-preguntas';
import { AdminGuard } from './services/auth/admin.guard';
import { Presentacion } from './components/presentacion/presentacion';
import { Ranking } from './components/ranking/ranking';

export const routes: Routes = [
    {path:'',component:Home},
    {path:"login",component: LoginComponent},
    {path: "preguntas", component: CartaPreguntaComponent},
    {path: "resultados", component: Results},
    {path: "admin", component: ListarPreguntas}, // esta de mas
    {path: "presentacion", component: Presentacion},
    {path: 'admin', component: ListarPreguntas, canActivate: [AdminGuard] },
    // Cuando un usuario intenta entrar a /admin, Angular ejecuta el método canActivate() de la clase AdminGuard.
    // Si canActivate() devuelve true, se muestra el componente ListarPreguntas.
    // Si devuelve false, Angular bloquea el acceso y normalmente redirige a otra ruta (como /login).
    {path: 'ranking', component: Ranking }
];
