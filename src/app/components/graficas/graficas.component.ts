import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [HotelService, UsuarioService]
})
export class GraficasComponent implements OnInit {

  chartOptions = {
    responsive: true,
  };

  //'Download', 'Sales','Mail Sales'

  //Nombre Hoteles
  chartLabels:any = [];

  //Cantidas de hoteles
  chartData:any = [300, 500, 100];

  chartColors:any = [
    {
    backgroundColor: [],
  }
];

  chartLegend = true;
  chartPlugins = [];

  public modelHotelesGet: any = [];

  constructor(
    public _hotelService: HotelService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getHoteles()
  }

  getHoteles(){
    this._hotelService.obtenerHoteles(this._usuarioService.getToken()).subscribe(
      (response) => {
        console.log(response.hotel);
        this.modelHotelesGet = response.hotel;
        this.modelHotelesGet.forEach(dato => {
          console.log(dato);
          this.chartLabels.push(dato.nombre);
          // this.chartData.push(dato.direccion);
          // this.chartData.push(dato.telefono);
          this.chartColors[0].backgroundColor.push(`#${ Math.floor(Math.random()*16777215).toString(16) }`);
        })

      },
      (error) => {
        console.log(error)
      }
    )
  }

}
 
