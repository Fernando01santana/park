import { HttpException, HttpStatus } from '@nestjs/common';

export class StockNotFount extends HttpException {
  constructor() {
    super('Estoque nao encontrado', HttpStatus.NOT_FOUND);
  }
}
