import { Injectable } from '@nestjs/common';
import {
  LevelAcessNotExistsException,
  UserCreatedException,
  UserExistsException,
  UserNotFoundException,
} from 'src/shared/exceptions/userexists.exception';
import { createUserDto } from '../dto/createUser.dto';
import { updateUser } from '../dto/updatedUser.dto';
import { acessLevel, Users } from '../entites/user.entity';
import { ICreatedUser } from '../interface/ICreatedUser';
import UserRepository from '../repositorie/userRepository';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}
  async create(createUser: createUserDto): Promise<ICreatedUser> {
    const userExistsByDocument = await this.UserRepository.findByDocument(
      createUser.document,
    );
    const userExistsByEmail = await this.UserRepository.findByEmail(
      createUser.email,
    );
    if (userExistsByDocument || userExistsByEmail) {
      throw new UserExistsException();
    }
    const acessLevelSearch = await this.searchAcessLevel(
      createUser.acessLevel[0],
    );

    if (!acessLevelSearch) {
      throw new LevelAcessNotExistsException();
    }
    const user = await this.UserRepository.create(createUser, acessLevelSearch);
    return { user: user, msg: new UserCreatedException() };
  }

  async update(id: string, updateuser: updateUser): Promise<Users> {
    const userExists = await this.UserRepository.findById(id);
    if (userExists && userExists.id !== null) {
      const user = await this.UserRepository.update(id, updateuser);
      return user;
    }
    throw new UserNotFoundException();
  }

  async list(): Promise<Users[]> {
    return await this.UserRepository.list();
  }

  async remove(id: string): Promise<void> {
    const userExists = await this.UserRepository.findById(id);
    if (userExists && userExists.id !== null) {
      return await this.UserRepository.delete(id);
    }
    throw Error('Usuario nao encontrado');
  }

  async searchAcessLevel(level: string): Promise<acessLevel | void> {
    switch (level) {
      case 'client':
        return acessLevel.client;
      case 'manager':
        return acessLevel.manager;
      case 'employeer':
        return acessLevel.employeer;
      case 'admin':
        return acessLevel.admin;
      default:
        return null;
    }
  }

  async emailVerify(email: string): Promise<void> {
    const emailExists = await this.UserRepository.findByEmail(email);
    if (!emailExists || !emailExists.id) {
      throw new UserExistsException();
    }
  }
}
