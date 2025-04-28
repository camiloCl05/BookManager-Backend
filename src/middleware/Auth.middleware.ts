import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/database";
import UserRepository from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import { AuthService } from "../services/auth/Auth.service";

//const userRepository = AppDataSource.getRepository(User);
const userRepository = new UserRepository(AppDataSource);
const authService = new AuthService(userRepository);

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    res.status(401).json({ error: "Token error" });
    return;
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    res.status(401).json({ error: "Token malformatted" });
    return;
  }

  try {
    const decoded = authService.decodeToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
    return;
  }
}
