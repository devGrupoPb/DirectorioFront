import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.scss'],
  providers: [UsuarioService]
})

export class InterfazComponent implements OnInit {
  public UsuarioModelPost: Usuario;
  public UsuarioModelGetId: Usuario;
  public UsuarioModelGet: Usuario;
  public token;
  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.UsuarioModelPost = new Usuario( '',
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
    this.UsuarioModelGetId = new Usuario( '',
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
    this.token = this._usuarioService.getToken();
  }
  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this._usuarioService.obtenerUsuario(this.token).subscribe(
      (response) => {
        this.UsuarioModelGet = response.usuario;
        console.log(this.UsuarioModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }


}
