import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hotel } from '../models/hotel.model';


@Injectable({
  providedIn: 'root',
})
export class HotelService {
  public url: String = 'https://ssdfasdf.onrender.com/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token;
  public identidad;

  constructor(public _http: HttpClient) {}

  obtenerHoteles(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHoteles', {
      headers: this.headersVariable,
    });
  }
  
  obtenerHotelesId(idHotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHotelesId/' + idHotel, {
      headers: headersToken,
    });
  }

  obtenerHotelesG(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerHotelxGerente', {
      headers: this.headersVariable,
    });
  }

  agregarHoteles(modeloHoteles: Hotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloHoteles);

    return this._http.post(this.url + '/agregarHotel', parametros, {
      headers: headersToken,
    });
  }

  editarHoteles(modeloHoteles: Hotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloHoteles);
    return this._http.put(
      this.url + '/editarHotel/' + modeloHoteles._id,
      parametros,
      {
        headers: headersToken,
      }
    );
  }

  eliminarHoteles(idHotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarHotel/' + idHotel, {
      headers: headersToken,
    });
  }
}
