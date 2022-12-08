import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
  })
  name: string;

  @Column({
    length: 30,
  })
  login: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    select: false,
  })
  salt: string;
}
