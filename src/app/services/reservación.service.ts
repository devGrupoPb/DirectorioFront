import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reservacion } from '../models/reservacion.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaciónService {
  public url: String = 'https://ssdfasdf.onrender.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }

  obtenerReservacionIdH(idHotel): Observable<any> {
    return this._http.get(this.url + '/obtenerReservacionesxHotel/' + idHotel, { headers: this.headersVariable }).pipe(
      delay(250)
    );
  }

  agregarReservacion(idHabitacion, modeloReservacion: Reservacion ): Observable<any> {

    let parametros = JSON.stringify(modeloReservacion);

    return this._http.post(this.url + '/AgregarReservacion/' + idHabitacion, parametros, { headers: this.headersVariable});
  }


  editarReservacion(modeloReservacion: Reservacion): Observable<any> {
    let parametro = JSON.stringify(modeloReservacion);

    return this._http.put(this.url + '/editarReservacion/' + modeloReservacion._id, parametro, { headers: this.headersVariable})
  }


  eliminarReservacion(idReservacion): Observable<any> {
    return this._http.delete(this.url + '/eliminarReservacion/' + idReservacion, { headers: this.headersVariable});
  }
}
