import { HttpException, HttpStatus } from '@nestjs/common';

export class TypeProductNotFound extends HttpException {
  constructor() {
    super('Tipo de produto informado nao existe!', HttpStatus.NOT_FOUND);
  }
}

export class ProductExists extends HttpException {
  constructor() {
    super('Produto informado ja cadastrado no sistema', HttpStatus.AMBIGUOUS);
  }
}

export class ProductNotFount extends HttpException {
  constructor() {
    super('Produto nao encontrado', HttpStatus.NOT_FOUND);
  }
}
