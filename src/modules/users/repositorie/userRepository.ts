import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from '../dto/createUser.dto';
import { updateUser } from '../dto/updatedUser.dto';
import { acessLevel, Users } from '../entites/user.entity';
import UserRepositoryInterface from '../interface/IUserRepository';

export default class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,
  ) {}
  async create(data: createUserDto): Promise<Users> {
    const acessLevelSearch = await this.searchAcessLevel(data.acessLevel[0]);
    console.log(acessLevelSearch);

    if (!acessLevelSearch) {
      throw Error('Nivel de acesso informado nao existe!');
    }

    const createUser = await this.repository.create();
    createUser.address = data.address;
    createUser.birthDay = this.convertData(data.birth_day);
    createUser.document = data.document;
    createUser.lastName = data.name;
    createUser.name = data.lastName;
    createUser.subscriber = data.subscriber;
    createUser.acessLevel = acessLevelSearch;
    createUser.email = data.email;
    createUser.id = '';
    console.log(createUser);

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
    if (!user && !user.id) {
      throw Error('Usuario nao encontrado');
    }
    user.lastName = updateData.lastName;
    user.name = updateData.name;
    user.birthDay = this.convertData(updateData.birthDay);
    user.address = updateData.address;
    user.subscriber = updateData.subscriber;

    this.repository.save(user);
    return user;

    // const userUpdated = await this.repository.update(user[0].id,updateData)
  }

  list(): Promise<Users[]> {
    return this.repository.find();
  }

  async findByDocument(document: string): Promise<boolean> {
    const user = await this.repository.findOne({
      where: { document: document },
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

  async searchAcessLevel(level: string): Promise<string> {
    for (const key in acessLevel) {
      const element = acessLevel[key];

      if (level.toLowerCase() === element) {
        return element;
      }
    }
  }
}
