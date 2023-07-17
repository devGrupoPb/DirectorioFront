import { Component, OnInit } from '@angular/core';
import { Reservacion } from 'src/app/models/reservacion.model';
import { ReservaciónService } from 'src/app/services/reservación.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss'],
  providers: [ReservaciónService]
})
export class ReservacionComponent implements OnInit {

  public servicioModelGet: Reservacion;
  public reservacionModelGetIdH: Reservacion;
  public token;

  constructor(
    private _serviciosService: ReservaciónService,
  ) { 
    this.reservacionModelGetIdH = new Reservacion('', {}, [{}], {}, 0, false);
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('idHotel'));
    let idHotel = localStorage.getItem('idHotel');
    this.getServiceIdH(idHotel);
  }


  getServiceIdH(idHotel){
    this._serviciosService.obtenerReservacionIdH(idHotel).subscribe(
      (response) => {
        console.log(response);
        this.reservacionModelGetIdH = response.reservacion;
      },
      (error) => { 

      }

    )
  }



}
