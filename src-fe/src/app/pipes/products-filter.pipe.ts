import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models';

@Pipe({
  name: 'productsFilter',
  pure: false
})

export class ProductsFilterPipe implements PipeTransform{
  transform(products: IProduct[], search: string = ''): IProduct[] {
    if (!search.trim()) {
      return products
    }

    return products.filter(product => {
      return product.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
  }
}
