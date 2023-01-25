import { Injectable, NestMiddleware } from '@nestjs/common';
import { DocumentInvalidException } from '../exceptions/userexists.exception';

@Injectable()
export class DocumentValidateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const data = JSON.parse(JSON.stringify(req.body));
    if (String(data.document).length < 11) {
      throw new DocumentInvalidException();
    }

    next();
  }
}
