import { typeProduct } from 'src/modules/product/entities/product.entity';

export class Utils {
  async searchTypeProduct(level: string): Promise<typeProduct | void> {
    switch (level) {
      case 'drinks':
        return typeProduct.DRINKS;
      case 'electronic':
        return typeProduct.ELETRONIC;
      case 'fresh':
        return typeProduct.FRESH;
      case 'processed':
        return typeProduct.PROCESSED;
      case 'toy':
        return typeProduct.TOY;
      default:
        return null;
    }
  }

  convertData(data: string): Date {
    const dateSplit = data.split('/');
    const dataFormtada = dateSplit[1] + '-' + dateSplit[0] + '-' + dateSplit[2];
    const stringDateToDate = new Date(dataFormtada);

    return stringDateToDate;
  }
}
