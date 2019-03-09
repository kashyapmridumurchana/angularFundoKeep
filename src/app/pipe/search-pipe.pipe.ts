import { Pipe, PipeTransform } from '@angular/core';
import { Label } from '../core/model/label/label';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(labels:Label[] , searchValue: any): any {
    console.log(labels, searchValue);
    if (!searchValue) {
      return labels;
    }
    else {
      return labels.filter(({labelName}) => {
        return labelName.includes(searchValue);
      });
    }
  }

}
