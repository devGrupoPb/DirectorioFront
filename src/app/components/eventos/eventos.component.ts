import { Component, OnInit } from '@angular/core';
import { Eventos } from 'src/app/models/eventos.models';
import { EventosService } from 'src/app/services/eventos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventosService]
})

export class EventosComponent implements OnInit {

  //Variable para almacenar todos los datos que obtenga de mi Get
  public eventosModelGet: Eventos;
  public eventosModelPost: Eventos;
  public eventosModelGetId: Eventos;
  public eventosModelGetIdH: Eventos;
  public token;
  public role: string;

  constructor(
    private _eventosService: EventosService,
    private _usuarioService: UsuarioService
    ) {

    this.eventosModelPost = new Eventos('','','','',{});
    this.eventosModelGetId = new Eventos('','','','',{});
    this.eventosModelGetIdH = new Eventos('','','','',{});
    this.token = this._usuarioService.getToken();

    _usuarioService.roleUpdated.subscribe(role => {
      this.role = role;
    });
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('idHotel'));
    let idHotel = localStorage.getItem('idHotel');
    this.getEventosIdH(idHotel);
  }

  getEventos() {
    this._eventosService.obtenerEventos().subscribe(
      (response) => {
        this.eventosModelGet = response.eventos;
        console.log(this.eventosModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  getEventosIdH(idHotel){
    this._eventosService.obtenerEventoIdH(idHotel).subscribe(
      (response) => {
        console.log(response);
        this.eventosModelGetIdH = response.Eventos;
      },
      (error) => { 

      }

    )
  }

  postEventos() {
    let idHotel = localStorage.getItem('idHotel');
    this._eventosService.agregarEvento(idHotel, this.eventosModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getEventosIdH(idHotel);

        this.eventosModelPost.nombre = '';
        this.eventosModelPost.hora = '';
        this.eventosModelPost.fecha = '';

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Evento Agregado Correctamente',
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
          title: 'Error al agregar el Evento',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  deleteEvento(id) {
    let idHotel = localStorage.getItem('idHotel');
    this._eventosService.eliminarEvento(id).subscribe(
      (response) => {
        console.log(response);
        this.getEventosIdH(idHotel);

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Evento Eliminado Correctamente',
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
  getEventoId(idHabitacion){
    this._eventosService.obtenerEventoId(idHabitacion).subscribe(
      (response) => {
        console.log(response);
        this.eventosModelGetId = response.eventos;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  putEvento() {
    let idHotel = localStorage.getItem('idHotel');
    this._eventosService.editarEventos(this.eventosModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getEventosIdH(idHotel);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

//Rep reciente
