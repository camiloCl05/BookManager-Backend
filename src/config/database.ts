import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

//Importamos las tablas(entities)
import { User } from "../entities/user.entity";
import { Book } from "../entities/book.entity";

dotenv.config();

//Creamos nuestra la conexion con la base de datos(Postgres)
export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  entities: [User, Book],
  logging: true,
  synchronize: true,
});
