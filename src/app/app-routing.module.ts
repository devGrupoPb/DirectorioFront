import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleHabitacionComponent } from './components/detalle-habitacion/detalle-habitacion.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { HomeComponent } from './components/home/home.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { InterfazComponent } from './components/interfaz/interfaz.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { SingUpGerenteComponent } from './components/sing-up-gerente/sing-up-gerente.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'hoteles', component: HotelesComponent, },
  { path: 'hoteles/:id', component: HotelesComponent, },
  { path: 'habitaciones', component: HabitacionesComponent},
  { path: 'habitacion', component: HabitacionComponent},
  { path: 'habitaciones/:id', component: HabitacionesComponent},
  { path: 'interfaz', component: InterfazComponent},
  { path: 'sing-up-gerente', component: SingUpGerenteComponent},
  { path: 'eventos', component: EventosComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'graficas', component: GraficasComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'loader', component: LoaderComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'cuenta', component: CuentaComponent},
  { path: 'reservacion', component: ReservacionComponent},
  { path: 'detalleHabitacion/:id', component: DetalleHabitacionComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
