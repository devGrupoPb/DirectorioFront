import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Habitaciones } from 'src/app/models/habitacion.models';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ReservaciónService } from 'src/app/services/reservación.service';
import Swal from 'sweetalert2';
import { Reservacion } from 'src/app/models/reservacion.model';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss'],
  providers: [HabitacionService]
})

export class HabitacionesComponent implements OnInit {

  //Variable para almacenar todos los datos que obtenga de mi Get
  public habitacionModelGet: Habitaciones;
  public habitacionModelPost: Habitaciones;
  public habitacionModelGetId: Habitaciones;
  public habitacionModelGetIdH: Habitaciones;
  public reservacionModelPost: Reservacion;
  public token;
  public role: string;
  idHotel;
  idHabitacion;

  constructor(
    private _habitacionService: HabitacionService,
    private _reservacionService: ReservaciónService,
    private _usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
    ) {

    this.habitacionModelPost = new Habitaciones('','','','','',{},false,0);
    this.reservacionModelPost = new Reservacion('', {}, [{}], {}, 0, false);
    this.habitacionModelGetId = new Habitaciones('', '', '', '', '', {},false,0);
    this.habitacionModelGetIdH = new Habitaciones('', '', '', '', '', {},false,0);
    this.token = this._usuarioService.getToken();

    _usuarioService.roleUpdated.subscribe(role => {
      this.role = role;
    });
  }

  ngOnInit(): void {
    let idHabitacion = localStorage.getItem('idHabitacion');
    localStorage.setItem("idHabitacion", idHabitacion);
    console.log(localStorage.getItem('idHabitacion'));
    this.getHabitacionId(idHabitacion);

    console.log(localStorage.getItem('idHotel'));
    let idHotel = localStorage.getItem('idHotel');
    this.getHabitacionesIdH(idHotel);
  }

  getHabitaciones() {
    this._habitacionService.obtenerHabitaciones().subscribe(
      (response) => {
        this.habitacionModelGet = response.habitaciones;
        console.log(this.habitacionModelGet);
        
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  getHabitacionesIdH(idHotel){
    this._habitacionService.obtenerHabitacionIdH(idHotel).subscribe(
      (response) => {
        console.log(response);
        this.habitacionModelGetIdH = response.habitaciones;
      },
      (error) => { 

      }

    )
  }

  getHabitacionId(idHab){
    this._habitacionService.obtenerHabitacionId(idHab).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem("idHabitacion", idHab);
        this.habitacionModelGetId = response.habitacion;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  postHabitaciones() {
    let idHotel = localStorage.getItem('idHotel');
    this._habitacionService.agregarHabitacion(idHotel, this.habitacionModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getHabitacionesIdH(idHotel); 

        
        this.habitacionModelPost.tipoHabitacion = '';
        this.habitacionModelPost.numeroHabitacion = '';
        this.habitacionModelPost.numeroPiso = '';
        this.habitacionModelPost.precio = '';
        this.habitacionModelPost.estado = true;
        this.habitacionModelPost.numeroDias = 0;

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Habitación Agregado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);
        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al agregar la habitación',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  postReservacion() {
    let idHabitacion = localStorage.getItem('idHabitacion');
    this._reservacionService.agregarReservacion(idHabitacion, this.reservacionModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getHabitacionId(idHabitacion); 
        
        this.reservacionModelPost.estado = false;
        this.reservacionModelPost.numeroDias = 0;

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Habitación Agregado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);
        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al agregar la habitación',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  deleteHabitacion(id) {
    let idHotel = localStorage.getItem('idHotel');
    this._habitacionService.eliminarHabitacion(id).subscribe(
      (response) => {
        console.log(response);
        this.getHabitacionesIdH(idHotel); 

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Habitación Eliminado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  //Funcion para editar Habitaciones



  putHabitacion() {
    let idHotel = localStorage.getItem('idHotel');
    this._habitacionService.editarHabitacion(this.habitacionModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getHabitacionesIdH(idHotel); 
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

//Rep reciente
