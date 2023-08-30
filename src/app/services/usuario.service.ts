import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';
import { departamento } from '../models/departamento.model'
import { password } from '../models/validator.model';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  private sesionSubject = new BehaviorSubject<any>(null);
  isAuthenticated = this.sesionSubject.asObservable();
  public token;
  public identidad;
  public roleSubject: BehaviorSubject<any>;
  public roleUpdated: Observable<any>;

  constructor(public _http: HttpClient) {
    var token = localStorage.getItem('token');
    var identidad = localStorage.getItem('identidad');
    var usuario = identidad ? JSON.parse(identidad) : null;

    this.sesionSubject = new BehaviorSubject<any>(token);
    this.isAuthenticated = this.sesionSubject.asObservable();
    this.roleSubject = new BehaviorSubject<any>(usuario ? usuario.rol : null);
    this.roleUpdated = this.roleSubject.asObservable();
  }

  obtenerUsuario(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerUsuarios', {
      headers: this.headersVariable,
    });
  }

  login(usuario, obtenerToken = null): Observable<any> {
    if (obtenerToken != null) {
      usuario.obtenerToken = obtenerToken;
      console.log(usuario);
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, {
      headers: this.headersVariable,
      
    })
    .pipe(map((res: any) => {
      if (obtenerToken) {
        localStorage.setItem('token', res.token);
        console.log(usuario);
        this.sesionSubject.next(res.token);
      } else {
        console.log(usuario);

        this.roleSubject.next(res.usuario.rol);
      }

      return res;
    }));
  }

  login1(usuario1, obtenerToken = null): Observable<any> {
    if (obtenerToken != null) {
      usuario1.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario1);

    return this._http.post(this.url + '/login', params, {
      headers: this.headersVariable,
    })
    .pipe(map((res: any) => {
      if (obtenerToken) {
        localStorage.setItem('token', res.token);

        this.sesionSubject.next(res.token);
      } else {
        localStorage.setItem('identidad', JSON.stringify(res.usuario));

        this.roleSubject.next(res.usuario.rol);
      }

      return res;
    }));
  }


  getUserID(idUser):Observable<any>{
    return this._http.get(this.url + '/obtenerUsuarioId/' + idUser, { headers: this.headersVariable });
    
  }
  getToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != undefined) {
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if (identidad2 != undefined) {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

  registrarUsuario(modelUser: Usuario): Observable<any> {
    let parametros = JSON.stringify(modelUser);
    return this._http.post(this.url + '/registrarUsuario', parametros, {
      headers: this.headersVariable,
    });
  }

  usuarioLogeado(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerUsuarioslog', {
      headers: this.headersVariable,
    });
  }

  registrarGerente(modelUser: Usuario): Observable<any> {
    let parametros = JSON.stringify(modelUser);
    return this._http.post(this.url + '/crearGerente', parametros, {
      headers: this.headersVariable,
    });
  }
  
  eliminarUsuario(idUsuario, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarUsuario/' + idUsuario, { headers: headersToken });
  }
  editarUsuario(modeloUsuario: Usuario): Observable<any> {
    let parametro = JSON.stringify(modeloUsuario);

    return this._http.put(this.url + '/editarUsuario/' + modeloUsuario._id, parametro, { headers: this.headersVariable})
  }
  editarPassword(modelopassword: password): Observable<any> {
    let parametro = JSON.stringify(modelopassword);

    return this._http.put(this.url + '/editarPassword', parametro, { headers: this.headersVariable})
  }
 
  clearToken() {
    localStorage.clear();

    this.sesionSubject.next(null);
    this.roleSubject.next(null);
    this.sesionSubject.next(false); // Notifica que no está autenticado
    this.roleSubject.next(null);
    

  }
  obtenerDepartamentos(): Observable<any> {
    return this._http.get(this.url + '/ObtenerDepto', {
    });
  }

  obtenerUsuarios(page: number, pageSize: number): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };
  
    return this._http.get(this.url + '/obtenerUsuarios', {
      headers: headersToken,
      params
    });
  }

  registraDepartamento(modelDepartamento: departamento): Observable<any> {
    let parametros = JSON.stringify(modelDepartamento);
    return this._http.post(this.url + '/resgistrarDepto', parametros, {
      headers: this.headersVariable,
    });
  }

}
