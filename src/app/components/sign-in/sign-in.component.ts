import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public userModel: Usuario;

  constructor(
    private title:Title,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    title.setTitle('sign-in')
    this.userModel = new Usuario( '',
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
    '', [{}]);
  }

  ngOnInit(): void {}

  getTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._usuarioService.login(this.userModel, 'true').subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          console.log(<any>error);
        }
      );
    });
  }

  login() {
    this._usuarioService.login(this.userModel).subscribe(
      (response) => {
        this.getTokenPromesa().then((respuesta) => {
          this._router.navigate(['/usuarios']);
        });

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Bienvenido',
        });
      },
      (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'correo o contraseña incorrectos ',
        });
      }
    );
  }
}
