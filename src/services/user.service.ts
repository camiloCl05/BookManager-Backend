import { AppDataSource } from "../config/database";
import UserRepository from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";

class UserService {
  private userRepository = new UserRepository(AppDataSource);

  async registerUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const existingUser = await this.userRepository.getByEmail(userData.email);
    if (existingUser) {
      throw new Error("Este correo ya existe");
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);

    return this.userRepository.createUser({
      name: userData.name,
      email: userData.email,
      passwordHash,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }

  // async validateUserCredentials(
  //   email: string,
  //   password: string
  // ): Promise<User> {
  //   const user = await this.userRepository.getByEmail(email);
  //   if (!user) throw new Error("Correo o contreasena invalidas");

  //   const isMatch = await bcrypt.compare(password, user.passwordHash);
  //   if (!isMatch) throw new Error("Correo o coontrasena invalidas");

  //   return user;
  // }
}

export default new UserService();
