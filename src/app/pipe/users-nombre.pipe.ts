import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersNombre'
})
export class UsersNombrePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultatoUser =[];
    for(const  a of value) {
    if(a.nombre.indexOf(arg) > -1){
      console.log('')
    }
  }
  }
}
 