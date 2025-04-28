import { Request, Response } from "express";
import userService from "../services/user.service";
import { BaseController } from "../core/common/BaseControllers";

class UserController extends BaseController {
  // Obtener todos los usuarios
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      this.sendError(res, error.message, 400);
    }
  }

  // Obtener usuario por ID
  async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);

    if (!user) {
      this.sendError(res, "Usuario no encontrado", 400);
    } else {
      res.json(user);
    }
  }

  // Eliminar usuario
  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      await userService.deleteUser(id);
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error: any) {
      this.sendError(res, error.message, 404);
    }
  }
}

export default new UserController();
