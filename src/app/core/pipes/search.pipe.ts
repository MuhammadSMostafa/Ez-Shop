import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(data:any[], searchText:string ):any[] {
    return data.filter((item)=>item.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}
