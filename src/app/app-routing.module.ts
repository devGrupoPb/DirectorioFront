import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { SingUpGerenteComponent } from './components/sing-up-gerente/sing-up-gerente.component';

import { UsuariosComponent } from './components/usuarios/usuarios.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sing-up-gerente', component: SingUpGerenteComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
