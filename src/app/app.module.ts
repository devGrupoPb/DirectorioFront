import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { FormsModule } from '@angular/forms';
import { SearchHotelPipe } from './pipes/search-hotel.pipe';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    SearchHotelPipe,
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
    ChartsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
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
