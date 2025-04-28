import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre" })
  name: string;

  @Column({ name: "correo", unique: true })
  email: string;

  @Column({ name: "contrasena" })
  passwordHash: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
