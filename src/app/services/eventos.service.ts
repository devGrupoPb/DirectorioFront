import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Eventos } from '../models/eventos.models';

@Injectable({
  providedIn: 'root'
})

export class EventosService {
  public url: String = 'https://ssdfasdf.onrender.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }

  obtenerEventos(): Observable<any> {
    return this._http.get(this.url + '/verEventos', { headers: this.headersVariable });
  }

  obtenerEventoId(idEvento): Observable<any> {
    return this._http.get(this.url + '/evento/' + idEvento, { headers: this.headersVariable });
  }
  
  obtenerEventoIdH(idHotel): Observable<any> {
    return this._http.get(this.url + '/obtenerEventosxhotel/' + idHotel, { headers: this.headersVariable }).pipe(
      delay(250)
    );
  }

  agregarEvento(idHotel, modeloEvento: Eventos): Observable<any> {

    let parametros = JSON.stringify(modeloEvento);

    return this._http.post(this.url + '/agregarEvento/' + idHotel, parametros, { headers: this.headersVariable});
  }


  editarEventos(modeloEvento: Eventos): Observable<any> {
    let parametro = JSON.stringify(modeloEvento);

    return this._http.put(this.url + '/editarEvento/' + modeloEvento._id, parametro, { headers: this.headersVariable})
  }


  eliminarEvento(idEvento): Observable<any> {
    return this._http.delete(this.url + '/eliminarEvento/' + idEvento, { headers: this.headersVariable});
  }

}
