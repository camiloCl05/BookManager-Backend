import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("libros")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "titulo" })
  title: string;

  @Column({ name: "autor" })
  author: string;

  @Column({ name: "ano" })
  year: number;

  @Column({ name: "descripcion" })
  description: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
