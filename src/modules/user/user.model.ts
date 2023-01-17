import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 60,
  })
  name: string;

  @Column({
    nullable: false,
    length: 30,
  })
  login: string;

  @Column({
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    select: false,
  })
  salt: string;
}
