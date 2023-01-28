import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../../../config/jwt/jwt.payload';
import { UserService } from '../../users/services/users.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.emailVerify(email);
    return await this.usersService.passwordHashVerify(user.password, password);
  }
  async generateAccessToken(email: string) {
    const user = await this.usersService.emailVerify(email);
    const payload: JWTPayload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
