/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends HttpException {
  constructor() {
    super('Email/CPF ja cadastrado!', HttpStatus.AMBIGUOUS);
  }
}
export class UserCreatedException extends HttpException {
  constructor() {
    super('Usuario criado com sucesso!', HttpStatus.CREATED);
  }
}
export class UserNotFoundException extends HttpException {
  constructor() {
    super('Usuario nao encontrado!', HttpStatus.NOT_FOUND);
  }
}
export class DocumentInvalidException extends HttpException {
  constructor() {
    super('Documento invalido!', HttpStatus.BAD_REQUEST);
  }
}
export class LevelAcessNotExistsException extends HttpException {
  constructor() {
    super('Nivel de acesso informado nao existe!', HttpStatus.NOT_FOUND);
  }
}

export class ErrorHashPasswordGenerate extends HttpException {
  constructor() {
    super('Erro ao gerar hash da senha informada!', HttpStatus.NOT_MODIFIED);
  }
}

export class JwtExpired extends HttpException {
  constructor() {
    super('Token expirado, faça login novamente!', HttpStatus.BAD_REQUEST);
  }
}

export class TokenJwtNotFound extends HttpException {
  constructor() {
    super('Token nao enviado!', HttpStatus.NOT_FOUND);
  }
}
