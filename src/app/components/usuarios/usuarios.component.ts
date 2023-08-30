import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { departamento } from 'src/app/models/departamento.model';
import { password } from 'src/app/models/validator.model';
import { Validator } from '@angular/forms'; 
import { Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.Component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService],
})
export class UsuariosComponent implements OnInit {
  
  displayedColumns: string[] = [ 'nombre','apellido','email','usuario','password','puesto','departamento','celular_Corporativo','extencion','sucursal','pais']; // Agrega los nombres de las columnas
  dataSource = new MatTableDataSource<Usuario>(); 
  public usuarioModelGet: any;
  public imgURL = "https://firebasestorage.googleapis.com/v0/b/imgs-330ed.appspot.com/o/logoGrupooPb.png?alt=media&token=b05fe2e9-9819-4f4e-952d-4514ba77906c"
  public usuarioModelPost: any ;
  public usuarioModelGetId : Usuario;
  public usuarioModelPUT: Usuario;
  public postPassword: password;
  public depatamentoModelGet: any;
  public searchUsuario;
  public requests: any=[]
  public postDepartamentos: departamento;
  public searchPuesto;
  public paises: string[] = ['Costa Rica',' El Salvador','Guatemala','Honduras','Nicaragua',' Panamá'];
  public searchPais;
  public token;
  public identidad;
  public isAuthenticated: Observable<any>;
  public role: string;
  public perfilModelGetId: Usuario;
  public perfilModelGet: Usuario;
  public idUser
  public userModel: Usuario;
  public recargarC =- 0
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private router: Router ,private titule: Title, public sUsuario: UsuarioService,

    
    private _router: Router
             ) {
              this.postPassword = new password('','')
              this.postDepartamentos = new departamento('','');
              this.depatamentoModelGet = new departamento('','');
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
              '',);
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
    this.dataSource.paginator = this.paginator; // Configura la paginación
    this.dataSource.sort = this.sort; 

    this.sUsuario.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
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
        this.usuarioModelGet = Array.of(this.usuarioModelGet)
        console.log(response);
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }
  getDepartamento() {
    this.sUsuario.obtenerDepartamentos().subscribe(
      (response) => {
        this.depatamentoModelGet = response.depto;
        this.depatamentoModelGet = Array.of(this.depatamentoModelGet)
        console.log(response);
        
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }
  getPaises(){
    
  }
  VaciarToken(){
    this.sUsuario.clearToken();
   
    Swal.fire({
      icon: 'success',
      title: 'Sesión Cerrada',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.reload();
    })
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
  postDepartamento() {
    this.sUsuario.registraDepartamento(this.postDepartamentos).subscribe(
      (response) => {
        console.log(response);
    
        this.postDepartamentos.nombre = ''
        
        this.getDepartamento()
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
  put() {
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

  getUsuariosFromService(page: number, pageSize: number) {
    this.sUsuario.obtenerUsuarios(page, pageSize).subscribe(
      (response) => {
        this.dataSource.data = response.usuarios; // Asigna la data a la dataSource
      },
      (err) => {
        console.log(<any>err);
      }
    );
  }
  
  actualizarc(){
    this.recargarC = this.recargarC * -1 +1 ;
  }

  cambiarPass(id){
    
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
            Swal.fire({
              icon: 'error',
              title: response.mensaje,
            }
              
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
              title: error.mensaje,
            });
          }
        );
      }
    });
 
    
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
            Swal.fire({
              icon: 'success',
              title: response.mensaje,
            }
              
            );
            const a = response
            return a
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


  getTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sUsuario.login(this.userModel, 'true').subscribe(
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
    this.sUsuario.login(this.userModel).subscribe(
      (response) => {
        this.getTokenPromesa().then((respuesta) => {
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
          title: 'Contraseña incorrecta',
        });
      }
    );
  }
}



