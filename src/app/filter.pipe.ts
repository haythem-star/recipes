import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure : false
})
export class FilterPipe implements PipeTransform {

  transform(value: any,filtreString : string,propName : string): any {
    if (filtreString.length === 0 || filtreString==='')
    {
      return value;
    }
    const resultArray = [];
    for(let item of value)
    {
      if(item[propName]=== filtreString)
      {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
