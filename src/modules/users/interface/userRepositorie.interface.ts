import { createUserDto } from '../dto/createUser.dto';
import { updateUser } from '../dto/updatedUser.dto';
import { acessLevel, Users } from '../entites/user.entity';

export default interface UserRepositoryInterface {
  create(createUser: createUserDto, acessLevel: acessLevel): Promise<Users>;
  list(): Promise<Users[]>;
  delete(id: string): Promise<void>;
  update(id: string, updateData: updateUser): Promise<Users>;
  findByDocument(document: string): Promise<boolean>;
  findById(id: string): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
}
