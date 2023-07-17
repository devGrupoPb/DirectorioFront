import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPuesto'
})
export class SearchPuestoPipe implements PipeTransform {

  transform(usuarios:any, busqueda:any):any {

    if(busqueda == undefined){
      return usuarios;
    }else{
      return usuarios.filter(usuario=>{
        return usuario.departamento.toLowerCase().includes(busqueda.toLowerCase());
      })
    }
  }

}
