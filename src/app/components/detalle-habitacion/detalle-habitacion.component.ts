import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-detalle-habitacion',
  templateUrl: './detalle-habitacion.component.html',
  styleUrls: ['./detalle-habitacion.component.scss'],
  providers: [HabitacionService]
})
export class DetalleHabitacionComponent implements OnInit {

  constructor(
    public _activeRoute: ActivatedRoute,
    public _habitacionService: HabitacionService
  ) { }

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((dataRuta) => {
      console.log(dataRuta.get('idHabitacion'));
      this.getHabitacionId(dataRuta.get('idHabitacion'))
    })
  }


  getHabitacionId(idHabitacion) {
    this._habitacionService.obtenerHabitacionId(idHabitacion).subscribe(
      (response)=> {
        console.log(response)
      },
      (error) => {
        console.log(error)
      },
    )
  }

}
