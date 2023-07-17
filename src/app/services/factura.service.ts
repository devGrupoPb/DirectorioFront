import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  public url: String = 'https://ssdfasdf.onrender.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }

  agregarFactura(modeloHabitacion: Factura): Observable<any> {

    let parametros = JSON.stringify(modeloHabitacion);

    return this._http.post(this.url + '/generarFactua' , parametros, { headers: this.headersVariable});
  }

}