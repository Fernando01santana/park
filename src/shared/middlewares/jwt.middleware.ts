import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import {
  JwtExpired,
  TokenJwtNotFound,
} from '../exceptions/userexists.exception';

config();
@Injectable()
export class JwtValidateMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: () => void) {
    const data = JSON.parse(JSON.stringify(req.headers));
    if (!data.authorization) {
      throw new TokenJwtNotFound();
    }
    this.verifyToken(data.authorization.split(' ')[1]);
    next();
  }

  verifyToken(token: string): Promise<void> {
    const data = {
      secret: process.env.JWT_SECRET,
      publicKey: '',
    };
    try {
      this.jwtService.verify(token, data);
      return;
    } catch (error) {
      throw new JwtExpired();
    }
  }
}
