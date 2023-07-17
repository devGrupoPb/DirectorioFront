import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: Observable<any>;
  public role: string;

  constructor(public _usuarioService: UsuarioService) {
    _usuarioService.isAuthenticated.subscribe(token => {
      this.isAuthenticated = token;
    });

    _usuarioService.roleUpdated.subscribe(role => {
      this.role = role;
    });
  }

  ngOnInit(): void {
  }

  VaciarToken(){
    this._usuarioService.clearToken();
    Swal.fire({
      icon: 'success',
      title: 'Sesión Cerrada',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
