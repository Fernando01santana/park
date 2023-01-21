import { Delete, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {createUserDto} from '../dto/createUser.dto'
import { updateUser } from '../dto/updatedUser.dto';
import { Users } from '../entites/user.entity';
import UserRepositoryInterface from '../interface/IUserRepository';
import UserRepository from '../repositorie/userRepository'; 


@Injectable()
export class UserService {
  constructor(
    private readonly UserRepository:UserRepository
  ){}
  async create(createUser: createUserDto): Promise<Users> {
    const userExists = await this.UserRepository.findByDocument(createUser.document)
    if (userExists) {
      throw Error("Usuario ja cadastrado!")
    }
    const user = await this.UserRepository.create(createUser)
    return user
  }

  async update(id: string,updateuser:updateUser):Promise<Users>{
    const userExists = await this.UserRepository.findById(id)
    if (userExists && userExists.id !== null) {
      const user = await this.UserRepository.update(id,updateuser)
      return user
    }
    throw Error("Usuario nao cadastrado!")
  }

  async list():Promise<Users[]>{
    return await this.UserRepository.list()
  }

  async remove(id:string):Promise<void>{
    return await this.UserRepository.delete(id)
  }
}
