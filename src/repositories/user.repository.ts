import { User } from "../entities/user.entity";
import { Repository, DataSource } from "typeorm";

class UserRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async getById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id }, relations: ["books"] });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.repository.create(userData);
    return this.repository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.find({ relations: ["books"] });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    await this.repository.delete(id);
  }

  async findOneByCondition(condition: any): Promise<User | null> {
    return this.repository.findOne(condition);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

export default UserRepository;

//export class UserRepository extends Repository<User> {}
