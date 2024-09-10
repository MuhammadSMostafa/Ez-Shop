import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true
})
export class TrimTextPipe implements PipeTransform {

  transform(text:String, trim:number): unknown {
    return text.split(" ", trim).join(" ");
  }
}
