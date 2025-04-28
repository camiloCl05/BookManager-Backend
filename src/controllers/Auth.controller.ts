import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/user.entity";
import UserRepository from "../repositories/user.repository";
import { AuthService } from "../services/auth/Auth.service";
import { AuthParamsBody } from "../services/auth/interface/auth.interface";

export class AuthController {
  private authservice: AuthService;

  constructor() {
    //const userRepository = AppDataSource.getRepository(User);
    const userRepository = new UserRepository(AppDataSource);
    this.authservice = new AuthService(userRepository);
  }

  async register(req: Request, res: Response) {
    await body("name").notEmpty().run(req);
    await body("email").notEmpty().run(req);
    await body("password").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    const params: AuthParamsBody = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const user = await this.authservice.register(params);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ ok: false, msg: error.message });
      } else {
        res.status(400).json({ ok: false, error: "Unknown error occurred" });
      }
    }
  }

  async login(req: Request, res: Response) {
    await body("email").isEmail().run(req);
    await body("password").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    try {
      const token = await this.authservice.login(email, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }

  decodeToken(req: Request, res: Response) {
    const { token } = req.body;
    try {
      const decoded = this.authservice.decodeToken(token);
      res.json(decoded);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }
}
