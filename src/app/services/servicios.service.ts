import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {
  public url: String = 'https://ssdfasdf.onrender.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }

  obtenerServicios(): Observable<any> {
    return this._http.get(this.url + '/verServicios', { headers: this.headersVariable });
  }

  obtenerServicioId(idServicio): Observable<any> {
    return this._http.get(this.url + '/servicio/' + idServicio, { headers: this.headersVariable });
  }

  obtenerServiceIdH(idHotel): Observable<any> {
    return this._http.get(this.url + '/obtenerServicoxHotel/' + idHotel, { headers: this.headersVariable }).pipe(
      delay(250)
    );
  }

  agregarServicio(idHotel, modeloServicio: Servicio): Observable<any> {

    let parametros = JSON.stringify(modeloServicio);

    return this._http.post(this.url + '/agregarServicio/' + idHotel, parametros, { headers: this.headersVariable});
  }


  editarServicio(modeloServicio: Servicio): Observable<any> {
    let parametro = JSON.stringify(modeloServicio);

    return this._http.put(this.url + '/editarServicio/' + modeloServicio._id, parametro, { headers: this.headersVariable})
  }


  eliminarServicio(idServicio): Observable<any> {
    return this._http.delete(this.url + '/eliminarServicio/' + idServicio, { headers: this.headersVariable});
  }

}

