export class CustomError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Necessário para herdar corretamente a classe Error
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class BoulderAlreadyExistsError extends CustomError {
  constructor() {
    super("Boulder já cadastrado.", 409); // 409 Conflict
  }
}

export class InvalidBoulderDataError extends CustomError {
  constructor(details?: string) {
    super(`Dados inválidos para Boulder. ${details || ""}`.trim(), 400); // 400 Bad Request
  }
}

export class BoulderNotFoundError extends CustomError {
  constructor() {
    super("Boulder(s) não encontrado(s).", 404); // 404 Not Found
  }
}

export class BoulderRepositoryError extends CustomError {
  constructor(details?: string) {
    super(`Erro no repositório de Boulders. ${details || ""}`.trim(), 500); // 500 Internal Server Error
  }
}

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super("Usuário já cadastrado.", 409); // 409 Conflict
  }
}

export class InvalidUserDataError extends CustomError {
  constructor(details?: string) {
    super(`Dados inválidos para usuário. ${details || ""}`.trim(), 400); // 400 Bad Request
  }
}

export class UserRepositoryError extends CustomError {
  constructor(details?: string) {
    super(`Erro no repositório de usuários. ${details || ""}`.trim(), 500); // 500 Internal Server Error
  }
}

export class UserNotFoundError extends CustomError {
  constructor() {
    super("Usuário(s) não encontrado(s).", 404); // 404 Not Found
  }
}

export class AscentAlreadyExistsError extends CustomError {
  constructor() {
    super("Ascensão já existente.", 409); // 409 Conflict
  }
}

export class InvalidAscentDataError extends CustomError {
  constructor(details?: string) {
    super(`Dados inválidos para ascensão. ${details || ""}`.trim(), 400); // 400 Bad Request
  }
}

export class AscentRepositoryError extends CustomError {
  constructor(details?: string) {
    super(`Erro no repositório de ascensões. ${details || ""}`.trim(), 500); // 500 Internal Server Error
  }
}

export class AscentNotFoundError extends CustomError {
  constructor() {
    super("Ascensão(ões) não encontrada(s).", 404); // 404 Not Found
  }
}

export class InvalidFriendshipDataError extends CustomError {
  constructor(details?: string) {
    super(
      `Dados inválidos para pedido de amizade. ${details || ""}`.trim(),
      400
    ); // 400 Bad Request
  }
}

export class FriendshipRepositoryError extends CustomError {
  constructor(details?: string) {
    super(`Erro no repositório de amizades. ${details || ""}`.trim(), 500); // 500 Internal Server Error
  }
}

export class FriendshipNotFoundError extends CustomError {
  constructor() {
    super("Amizade não encontrada.", 404); // 404 Not Found
  }
}

export class InvalidTokenError extends CustomError {
  constructor() {
    super("token não definido.", 400); // 400 Bad Request
  }
}

export class RedisError extends CustomError {
  constructor(message: string) {
    super(message, 400); // 400 Bad Request
  }
}
