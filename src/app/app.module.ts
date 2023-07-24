import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { SearchHotelPipe } from './pipes/search-hotel.pipe';
import { SingUpGerenteComponent } from './components/sing-up-gerente/sing-up-gerente.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { UsuarioService } from './services/usuario.service';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { SearchUsuarioPipe } from './pipes/search-usuario.pipe';
import { RecargaDirective } from './directivas/recarga.directive';
import { UsersNombrePipe } from './users-nombre.pipe';
import { SearchPuestoPipe } from './pipes/search-puesto.pipe';
import { SearchPaisPipe } from './pipes/search-pais.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    SearchHotelPipe,
    SingUpGerenteComponent,
    UsuariosComponent,
    FiltroPipe,
    SearchUsuarioPipe,
    RecargaDirective,
    UsersNombrePipe,
    SearchPuestoPipe,
    SearchPaisPipe
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],

  providers: [
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
