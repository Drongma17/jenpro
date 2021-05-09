import { Category } from './../model/category';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(categories: Category[], text: string): Category[] {
    if(text ==null || text == ""){
      return categories;
    }
    return categories.filter(n=>
      n.name.toLowerCase().includes(text) || n.name.toUpperCase().includes(text)
    );
  }
}
