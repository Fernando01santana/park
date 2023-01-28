import { Product } from '../entities/product.entity';

export default interface ProductRepositoryInterface {
  create(createProduct: any): Promise<Product>;
}
