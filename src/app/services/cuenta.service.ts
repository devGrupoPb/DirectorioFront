import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carrito } from '../models/carrito.model';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})

export class CuentaService {
  public url: String = 'https://ssdfasdf.onrender.com/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token;

  constructor(public _http: HttpClient) { }

  obtenerCarrito(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/ObternCarritodeUserLogedo', {
      headers: headersToken,
    });
  }

  agregarFactura(modelUser: Factura): Observable<any> {
    let parametros = JSON.stringify(modelUser);
    return this._http.post(this.url + '/crearGerente', parametros, {
      headers: this.headersVariable,
    });
  }

  
}
