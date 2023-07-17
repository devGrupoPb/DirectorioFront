import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPais'
})
export class SearchPaisPipe implements PipeTransform {

  transform(usuarios:any, busqueda:any):any {

    if(busqueda == undefined){
      return usuarios;
    }else{
      return usuarios.filter(usuario=>{
        return usuario.pais.toLowerCase().includes(busqueda.toLowerCase());
      })
    }
  }
}
