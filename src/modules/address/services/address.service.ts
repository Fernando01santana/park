/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { createAddress } from '../dto/createAdress.dto';
import { Address } from '../entities/address.entity';
import AddressRepository from '../repositorie/address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly AddressRepository: AddressRepository) {}

  async create(data: createAddress): Promise<Address> {
    const addresCreate = await this.AddressRepository.create(data);
    return addresCreate;
  }
}
