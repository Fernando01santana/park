import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/modules/address/entities/address.entity';
import { Repository } from 'typeorm';
import { createUserDto } from '../dto/createUser.dto';
import { updateUser } from '../dto/updatedUser.dto';
import { acessLevel, Users } from '../entites/user.entity';
import UserRepositoryInterface from '../interface/userRepositorie.interface';

@Injectable()
export default class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,
    @InjectRepository(Address)
    private addresRepository: Repository<Address>,
  ) {}
  async create(data: createUserDto, levelAcess: acessLevel): Promise<Users> {
    const createUser = this.repository.create();
    const address = this.addresRepository.create(data.address);

    createUser.birthDay = this.convertData(data.birth_day);
    createUser.document = data.document;
    createUser.lastName = data.lastName;
    createUser.name = data.name;
    createUser.subscriber = data.subscriber;
    createUser.acessLevel = levelAcess;
    createUser.email = data.email;
    createUser.address = [address];

    try {
      await this.repository.save(createUser);
      return createUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findBy({ id: id });
    await this.repository.remove(user);
  }

  async update(id: string, updateData: updateUser): Promise<Users> {
    const user = await this.repository.findOne({ where: { id: id } });

    user.lastName = updateData.lastName;
    user.name = updateData.name;
    user.birthDay = this.convertData(updateData.birthDay);
    user.subscriber = updateData.subscriber;

    this.repository.save(user);
    return user;
  }

  list(): Promise<Users[]> {
    return this.repository.find();
  }

  async findByDocument(document: string): Promise<boolean> {
    const user = await this.repository.findOne({
      where: { document: document },
      relations: ['address'],
    });
    if (user) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Users> {
    return await this.repository.findOne({ where: { id: id } });
  }

  convertData(data: string): Date {
    const dateSplit = data.split('/');
    const dataFormtada = dateSplit[1] + '-' + dateSplit[0] + '-' + dateSplit[2];
    const stringDateToDate = new Date(dataFormtada);

    return stringDateToDate;
  }
  findByEmail(email: string): Promise<Users> {
    return this.repository.findOne({ where: { email: email } });
  }
}
