import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public usuarioModelPost: Usuario;
  public token;

  constructor(private title:Title, private _usuarioService: UsuarioService, public _router: Router) {
    title.setTitle('sing-up')
    this.usuarioModelPost = new Usuario( 
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
    '',
    '',
     [{}]);
  }

  ngOnInit(): void {
  }

  postUsuario() {
    this._usuarioService.registrarUsuario(this.usuarioModelPost).subscribe(
      (response) => {
        console.log(response);
        this.usuarioModelPost._id = '';
        this.usuarioModelPost.nombre = '';
        this.usuarioModelPost.apellido = '';
        this.usuarioModelPost.email = '';
        this.usuarioModelPost.password = '';
        this.usuarioModelPost.rol = '';
        this.usuarioModelPost.extencion = '';
        this.usuarioModelPost.pais= '';
        this.usuarioModelPost.puesto = '',
        this.usuarioModelPost.departamento= '';
        this.usuarioModelPost.celular_Corporativo

        
        this._router.navigate(['/sign-in']);
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
