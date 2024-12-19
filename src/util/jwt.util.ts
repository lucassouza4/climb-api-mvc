import { Request } from "express";
import jwt from "jsonwebtoken";
import { Permissions } from "./enums/user";

export type Payload = {
  id: string;
  permissions: Permissions[];
};

export function verifyToken(req: Request): Payload | Error {
  const token = req.headers["authorization"];
  const jwtSecret = process.env.JWT_TOKEN;
  if (token && jwtSecret) {
    const tokenValue = token.startsWith("Bearer ") ? token.slice(7) : token;
    try {
      const decodedToken = jwt.verify(tokenValue, jwtSecret) as Payload;
      return { id: decodedToken.id, permissions: decodedToken.permissions };
    } catch {
      return new Error("Token invalido !");
    }
  }
  return new Error("token não informado !");
}
