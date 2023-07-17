import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { Usuario } from 'src/app/models/usuario.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [HotelService],
})
export class AdminComponent implements OnInit {
  public hotelesModelPost: Hotel;
  public hotelesModelGetId: Hotel;
  public hotelesModelGet: Hotel;
  public usuarioModelGetId: Usuario;
  public token;
  public role: string;
  public searchHotel;
  public filtro;
  public idHotel;

  constructor(
    public _activeRoute: ActivatedRoute,
    private _hotelService: HotelService,
    private _usuarioService: UsuarioService
  ) {
    this.hotelesModelPost = new Hotel('', '', '', '', '', [{}], [{}], [{}]);
    this.hotelesModelGetId = new Hotel('', '', '', '', '', [{}], [{}], [{}]);
    this.usuarioModelGetId = new Usuario( '',
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

    _usuarioService.roleUpdated.subscribe(role => {
      this.role = role;
    });
  }

  ngOnInit(): void {
    this.obtenerHoteles();
  }

  obtenerHoteles() {
    this._hotelService.obtenerHotelesG(this.token).subscribe(
      (response) => {
        this.hotelesModelGet = response.hoteles;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getHotelesId(idHotel) {
    this._hotelService.obtenerHotelesId(idHotel, this.token).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem("idHotel", idHotel);
        this.hotelesModelGetId = response.hotel
      },
      (error) => {}
    );
  }

  postHoteles() {
    this._hotelService
      .agregarHoteles(this.hotelesModelPost, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          this.obtenerHoteles();
          this.hotelesModelPost.nombre = '';
          this.hotelesModelPost.telefono = '';
          this.hotelesModelPost.direccion = '';
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
            title: 'Hotel registrado correctamente',
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
            title: error.error.mensaje,
          });
        }
      );
  }

  putHoteles() {
    this._hotelService
      .editarHoteles(this.hotelesModelGetId, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          this.obtenerHoteles();
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
            title: 'Hotel registrado correctamente',
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
            title: error.error.mensaje,
          });
        }
      );
  }

  deleteHotel(id) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este hotel?',
      text: '¡No podras revertir los cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._hotelService.eliminarHoteles(id, this.token).subscribe(
          (response) => {
            console.log(response);
            this.obtenerHoteles();
            Swal.fire(
              'Eliminado',
              'Se ha eliminado el hotel correctamente',
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
}
