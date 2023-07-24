import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarioModelGet: Usuario;
  public usuarioModelPost: Usuario;
  public usuarioModelGetId : Usuario;
  public usuarioModelPUT: Usuario;
  public searchUsuario;
  public searchPuesto;
  public searchPais;
  public token;
  public identidad;
  public isAuthenticated: Observable<any>;
  public role: string;
  public perfilModelGetId: Usuario;
  public perfilModelGet: Usuario;
  public idUser
  public recargarC =- 0
  constructor( private titule: Title, public sUsuario: UsuarioService,

    
    private _router: Router
             ) {

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
                [{}]
              );
              this.usuarioModelGetId = new Usuario(
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
                [{}]
              );
              this.token = this.sUsuario.getToken();
              sUsuario.isAuthenticated.subscribe(token => {
                this.isAuthenticated = token;
              });
          
              sUsuario.roleUpdated.subscribe(role => {
                this.role = role;
              });
              titule.setTitle('Usuarios')
   
            }
           

  ngOnInit(): void {
    this.getUsuario();
    this.setIdentidad();
  }
  getUsuarioL() {
    this.sUsuario.usuarioLogeado(this.token).subscribe(
      (response) => {
        this.perfilModelGet = response.usario;
        console.log(response);
      },
      (error) => {
        console.log(<any>error)
      }
    )
  }

  getUsuario() {
    this.sUsuario.obtenerUsuario(this.token).subscribe(
      (response) => {
        this.usuarioModelGet = response.usuario;
        console.log(response);
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }
  getUsuarioId(idUser){
    this.sUsuario.getUserID(idUser).subscribe(
      (response)=>{
        console.log(response);
       this.usuarioModelGetId = response.usuario
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  setIdentidad(){
    this.identidad = localStorage.getItem('identidad') 
    console.log(this.identidad.rol)
  }

  putUser() {
    this.sUsuario.editarUsuario(this.usuarioModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getUsuario();
      
      },
      (error) => {
        console.log(error);
        this.getUsuario();
      
      }
    )
  }
  
  actualizarc(){
    this.recargarC = this.recargarC * -1 +1 ;
  }

  deleteUser(id) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este Contacto?',
      text: '¡No podras revertir los cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sUsuario.eliminarUsuario(id, this.token).subscribe(
          (response) => {
            console.log(response);
            this.getUsuario();
            Swal.fire(
              'Eliminado',
              'Se ha eliminado el usuario correctamente',
              'success'
            );
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
              title: error.error.mensaje,
            });
          }
        );
      }
    });
  }
  SetID(_id){
    this.idUser = _id;
    console.log(this.idUser)
  }

  
  postUser() {
    this.sUsuario.registrarUsuario(this.usuarioModelPost).subscribe(
      (response) => {
        console.log(response);
        this.usuarioModelPost._id = '';
        this.usuarioModelPost.nombre = '', Validators.required;
        this.usuarioModelPost.apellido = '';
        this.usuarioModelPost.email = '';
        this.usuarioModelPost.password = '';
        this.usuarioModelPost.rol = '';
        this.usuarioModelPost.extencion = '';
        this.usuarioModelPost.pais= '';
        this.usuarioModelPost.puesto = '',
        this.usuarioModelPost.departamento= '';
        this.usuarioModelPost.celular_Corporativo = '';
        this.usuarioModelPost.sucursal = '',

        
        this.getUsuario()
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
  filterUserName = '';
}