import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import { UUID } from 'crypto';

@Entity("users")
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

  @BeforeInsert()
  async prepForInsert() {
    console.log('we are in the user before insert!', this);
    this.password = await this.hashPassword(this.password);
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
