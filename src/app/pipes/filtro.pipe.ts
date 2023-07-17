import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(hoteles:any, busqueda:any):any {

    if(busqueda == undefined){
      return hoteles;
    }else{
      return hoteles.filter(hotel=>{
        return hotel.idGerente.toLowerCase().includes(busqueda.toLowerCase());
      })
    }
  }

}
