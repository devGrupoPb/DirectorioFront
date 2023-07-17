import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHotel'
})
export class SearchHotelPipe implements PipeTransform {

  transform(hoteles:any, busqueda:any):any {

    if(busqueda == undefined){
      return hoteles;
    }else{
      return hoteles.filter(hotel=>{
        return hotel.nombre.toLowerCase().includes(busqueda.toLowerCase());
      })
    }
  }

}
