import { Component, OnInit } from '@angular/core';
import { carrito } from 'src/app/models/carrito.model';
import { Factura } from 'src/app/models/factura.model';
import { Habitaciones } from 'src/app/models/habitacion.models';
import { CuentaService } from 'src/app/services/cuenta.service';
import { FacturaService } from 'src/app/services/factura.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
  providers: [CuentaService, FacturaService]
})
export class CuentaComponent implements OnInit {
  public carritoModelGet: carrito;
  public facturaModelPost: Factura;
  public token;
  public role: string;
  public habitacion = [];
  public servicios = [];
  
  constructor(
    private _cuentaService: CuentaService,
    private _facturaService:  FacturaService,
    private _usuarioService: UsuarioService
  ) { 

    this.facturaModelPost = new Factura('','', [{}], [{}], 0);
    this.carritoModelGet = new carrito([{}], [{}], {}, 0);
    this.token = this._usuarioService.getToken();

    _usuarioService.roleUpdated.subscribe(role => {
      this.role = role;
    })
  }

  ngOnInit(): void {
    this.getCarrito();
  }



  getCarrito() {
    this._cuentaService.obtenerCarrito(this.token).subscribe(
      (response) => {
        this.carritoModelGet = response.carrito;
        this.habitacion = response.carrito.Habitacion;
        this.servicios = response.carrito.Servicios;
        console.log(this.carritoModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  postFactura() {
    this._facturaService.agregarFactura(this.facturaModelPost).subscribe(
      (response) => {
        console.log(response);

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ha realizado su pago correctamente',
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
          title: 'Error al pagar su factura',
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }
}
