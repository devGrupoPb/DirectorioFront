import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersNombre'
})
export class UsersNombrePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
