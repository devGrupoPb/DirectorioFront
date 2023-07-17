import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Habitaciones } from 'src/app/models/habitacion.models';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.scss'],
  providers: [HabitacionService]
})
export class HabitacionComponent implements OnInit {

    //Variable para almacenar todos los datos que obtenga de mi Get
    public habitacionModelGet: Habitaciones;
    public habitacionModelPost: Habitaciones;
    public habitacionModelGetId: Habitaciones;
    public habitacionModelGetIdH: Habitaciones;
    public token;
    public role: string;
    idHotel;
  
    constructor(
      private _habitacionService: HabitacionService,
      private _usuarioService: UsuarioService,
      private router: Router,
      private route: ActivatedRoute
      ) {
  
      this.habitacionModelPost = new Habitaciones('','','','','',{},false,0);
      this.habitacionModelGetId = new Habitaciones('', '', '', '', '', {},false,0);
      this.habitacionModelGetIdH = new Habitaciones('', '', '', '', '', {},false,0);
      this.token = this._usuarioService.getToken();
  
      _usuarioService.roleUpdated.subscribe(role => {
        this.role = role;
      });
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
  
    ngOnInit(): void {
      let idHotel = localStorage.getItem('idHotel');
      console.log(idHotel)
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
          this.habitacionModelPost.estado = false;
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
    getHabitacionId(idHabitacion){
      this._habitacionService.obtenerHabitacionId(idHabitacion).subscribe(
        (response) => {
          console.log(response);
          this.habitacionModelGetId = response.habitacion;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  
  
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
