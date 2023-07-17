import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sing-up-gerente',
  templateUrl: './sing-up-gerente.component.html',
  styleUrls: ['./sing-up-gerente.component.scss']
})
export class SingUpGerenteComponent implements OnInit {

  public usuarioModelPost: Usuario;
  public token;

  constructor(private _usuarioService: UsuarioService, public _router: Router) {
    this.usuarioModelPost = new Usuario( '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',[{}]);
  }

  ngOnInit(): void {}

  postGerente() {
    this._usuarioService.registrarGerente(this.usuarioModelPost).subscribe(
      (response) => {
        console.log(response);
        this.usuarioModelPost._id = '';
        this.usuarioModelPost.nombre = '';
        this.usuarioModelPost.email = '';
        this.usuarioModelPost.password = '';
        this._router.navigate(['/sing-up-gerente']);
        Swal.fire({
          icon: 'success',
          title: 'Registro completado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

}
