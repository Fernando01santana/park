import { Product } from '../entities/product.entity';

export default interface ProductRepositoryInterface {
  create(createProduct: any): Promise<Product[]>;
  // update(updateProduct): Promise<Product>;
  // remove(id: string): Promise<void>;
  list(): Promise<Product[]>;

  findByName(nameProduct: string): Promise<Product>;
  findByDateValidate(dateValidade: string): Promise<Product>;
  findByLot(lot: string): Promise<Product[]>;
}
