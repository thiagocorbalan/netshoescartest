import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBRL'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'BRL', symbolDisplay: boolean = true, digits?: string): string {

    if (!value) {
      return '';
    }
    let currencyFormated = null;
    const regex = /\w\d+(?=,)/;


    currencyFormated = new Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: currencyCode, maximumFractionDigits: 2
    }).format(value);

    const price = currencyFormated.match(regex)[0];
    currencyFormated = currencyFormated.replace(regex, '{0}');

    currencyFormated = currencyFormated.replace('{0}', `<span class='price-value'>${price}</span>`);


    return currencyFormated;
  }
}
