import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/Login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDTO: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDTO;
    const valid = await this.authService.validateUser(email, password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(email);
  }
}
