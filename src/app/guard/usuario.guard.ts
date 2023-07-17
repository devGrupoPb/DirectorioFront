import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  public identidad;

  constructor(
    public router: Router,
    public userRest: UsuarioService
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.userRest.getIdentidad().rol === 'Usuario') {

        return true;

      }else{
        this.router.navigate(['/login'])

    return true;
  }
}

}
