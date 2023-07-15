import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // comment for github testing
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
