import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsuario'
})
export class SearchUsuarioPipe implements PipeTransform {

  transform(usuarios:any, busqueda:any):any {

    if(busqueda == undefined){
      return usuarios;
    }else{
      return usuarios.filter(usuario=>{
        return usuario.nombre.toLowerCase().includes(busqueda.toLowerCase());
      })
    }
  }
}
