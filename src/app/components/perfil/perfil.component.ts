import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  public perfilModelGet: Usuario;
  public perfilModelGetId: Usuario;
  public token;

  constructor(
    public sUsuario: UsuarioService,
    private _router: Router
  ) {
    this.perfilModelGetId = new Usuario(
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
      [{}]
    );
    this.token = this.sUsuario.getToken();
   }

  ngOnInit(): void {
    this.getUsuarioL()
  }

  getUsuarioL() {
    this.sUsuario.usuarioLogeado(this.token).subscribe(
      (response) => {
        this.perfilModelGet = response.usario;
        console.log(response);
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }


  deleteUsuario(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Si borras tu cuenta no podrás recuperarla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sUsuario.eliminarUsuario(id, this.token).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(<any>error);
          }
        )
        Swal.fire(
          'Eliminado',
          'Usuario correctamente eliminado.',
          'success'
        )
        this._router.navigate(['/sign-in']);
        localStorage.clear();
      }
    })
  }

  
}
