import { createAddress } from '../dto/createAdress.dto';
import { Address } from '../entities/address.entity';

export default interface AddressRepositoryInterface {
  create(createAddress: createAddress): Promise<Address>;
}
