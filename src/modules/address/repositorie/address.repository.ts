import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createAddress } from '../dto/createAdress.dto';
import { Address } from '../entities/address.entity';
import AddressRepositoryInterface from '../interface/addressRepositorie.interface';

@Injectable()
export default class AddressRepository implements AddressRepositoryInterface {
  constructor(
    @InjectRepository(Address)
    private repository: Repository<Address>,
  ) {}

  async create(data: createAddress): Promise<Address> {
    const createAddress = this.repository.create(data);
    await this.repository.save(createAddress);
    return createAddress;
  }
}
