import { Pipe, PipeTransform } from '@angular/core';
declare var require: any
@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let dateFormat = require('dateformat');
    value = dateFormat(value, "dd-mm-yyyy");
    return value;
  }
}
