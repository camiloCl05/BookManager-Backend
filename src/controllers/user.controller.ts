import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
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
      res.status(400).json({ message: error.message });
    }
  }

  // Obtener usuario por ID
  async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
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
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }
}

export default new UserController();
