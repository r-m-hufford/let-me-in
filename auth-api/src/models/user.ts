import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Unique, ManyToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import { Role } from './role';

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

  @BeforeInsert()
  async prepForInsert() {
    this.password = await this.hashPassword(`${this.password}${process.env.AUTH_PEPPER}`);
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
