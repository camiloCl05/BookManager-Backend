import { User } from "../../entities/user.entity";
import UserRepository from "../../repositories/user.repository";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import { AuthParamsBody } from "../auth/interface/auth.interface";
import { error } from "console";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(params: AuthParamsBody) {
    const { email, name, password } = params;

    const existingUser = await this.userRepository.findOneByCondition({
      where: [{ email }, { name }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error("Ya existe un usuario con este email.");
      }
      if (existingUser.name === name) {
        throw new Error("Ya existe un usuario con este nombre de usuario");
      }
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    const user = new User();
    user.name = name;
    user.email = email;
    user.passwordHash = `${salt}:${hashedPassword}`;

    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }

  async login(email: string, passwordHash: string) {
    const user = await this.userRepository.findOneByCondition({
      where: { email },
    });

    if (!user) throw new Error("Usuario no encontrado");

    const [storedSalt, storedHash] = user.passwordHash.split(":");

    const hash = crypto
      .pbkdf2Sync(passwordHash, storedSalt, 1000, 64, "sha512")
      .toString("hex");

    if (hash !== storedHash) throw new Error("Contraseña Incorrecta");

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, "your_jwt-secret", {
      expiresIn: "1h",
    });

    return token;
  }

  decodeToken(token: string) {
    try {
      const decoded = jwt.verify(token, "your_jwt-secret");
      return decoded;
    } catch (error: any) {
      if (error.name == "TokenExpiredError") {
        throw new Error("El token ha expirado");
      } else if (error.name === "JsonWebTokenError") {
        throw new Error("El token es invalido");
      } else {
        throw new Error("Ocurrio un error al validar el token");
      }
    }
  }
}
