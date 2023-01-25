import { UserCreatedException } from 'src/shared/exceptions/userexists.exception';
import { Users } from '../entites/user.entity';

export interface ICreatedUser {
  user: Users;
  msg: UserCreatedException;
}
