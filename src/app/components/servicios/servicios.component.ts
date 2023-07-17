import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [ServicioService]
})

export class ServiciosComponent implements OnInit {

  //Variable para almacenar todos los datos que obtenga de mi Get
  public servicioModelGet: Servicio;
  public servicioModelPost: Servicio;
  public servicioModelGetId: Servicio;
  public servicioModelGetIdH: Servicio;
  public token;
  public role: string;
  idHotel;

  constructor(
    private _serviciosService: ServicioService,
    private _usuarioService: UsuarioService
    ) {

    this.servicioModelPost = new Servicio('','','');
    this.servicioModelGetId = new Servicio('', '', '');
    this.servicioModelGetIdH = new Servicio('', '', '');
    
    this.token = this._usuarioService.getToken();

    _usuarioService.roleUpdated.subscribe(role => {
      this.role = role;
    });
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('idHotel'));
    let idHotel = localStorage.getItem('idHotel');
    this.getServiceIdH(idHotel);
  }

  getServicios() {
    this._serviciosService.obtenerServicios().subscribe(
      (response) => {
        this.servicioModelGet = response.servicios;
        console.log(this.servicioModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  getServiceIdH(idHotel){
    this._serviciosService.obtenerServiceIdH(idHotel).subscribe(
      (response) => {
        console.log(response);
        this.servicioModelGetIdH = response.arratser;
      },
      (error) => { 

      }

    )
  }

  postServicio() {
    let idHotel = localStorage.getItem('idHotel');
    this._serviciosService.agregarServicio(idHotel, this.servicioModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getServiceIdH(idHotel);

        this.servicioModelPost.nombreServicio = '';
        this.servicioModelPost.costoServicio = '';

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Servicio Agregado Correctamente',
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
          title: 'Error al agregar el servicio',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }

  deleteServicio(id) {
    let idHotel = localStorage.getItem('idHotel');
    this._serviciosService.eliminarServicio(id).subscribe(
      (response) => {
        console.log(response);
        this.getServiceIdH(idHotel);

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Servicio Eliminado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  getServicioId(idServicio){
    this._serviciosService.obtenerServicioId(idServicio).subscribe(
      (response) => {
        console.log(response);
        this.servicioModelGetId = response.servicios;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  putServicio() {
    let idHotel = localStorage.getItem('idHotel');
    this._serviciosService.editarServicio(this.servicioModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getServiceIdH(idHotel);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

//Rep reciente
