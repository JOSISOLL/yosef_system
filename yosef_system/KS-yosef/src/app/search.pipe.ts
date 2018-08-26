import { Pipe, PipeTransform } from '@angular/core';
import { Parts } from './models/parts';

@Pipe({
  name: 'search',
  pure : false
})
export class SearchPipe implements PipeTransform {

  transform(parts: any, searchText: string): any {
    if (!searchText) return parts;
    if (searchText === undefined) return parts;
    // return parts.filter((x:any) => x.description.toLowerCase().startsWith(searchText.toLowerCase()) || x.stamp.toLowerCase().startsWith(searchText.toLowerCase()));
    return parts.filter( parts.description.indexOf(searchText) !== -1);
  }

}
