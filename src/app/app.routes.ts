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

// ¿Qué son las routes en Angular?
// Las routes (rutas) son las direcciones internas de tu aplicación de Angular. Te permiten navegar entre componentes sin recargar la página. Es lo que hace que una Single Page Application (SPA) funcione como si tuviera "múltiples páginas".

// ¿Por qué son necesarias?
// Porque Angular es una SPA (una sola página), pero muchas veces querés que parezca que tenés varias "pantallas":

// /login → Página de inicio de sesión
// /registro → Registro
// /juego → Pantalla del juego
// /admin → Administración de preguntas

// Las routes permiten esto, mostrando el componente correcto según la URL sin recargar el sitio completo.

// ¿Cómo navegar entre rutas?
// Desde código:
// this.router.navigate(['/juego']);
// Desde HTML:
// <a routerLink="/juego">Ir al juego</a>