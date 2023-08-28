import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Unique, ManyToMany, BeforeUpdate } from 'typeorm';
import { Role } from './role';
import { hashPassword } from '../services/password';

@Entity("users")
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('uuid', { default: () => 'uuid_generate_v4()' })
  userCode: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  /**
   * relationships
   */

  @ManyToMany(
    () => Role,
    role => role.users
  )
  roles: Role[];
}
