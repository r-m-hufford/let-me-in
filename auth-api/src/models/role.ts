import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ type: "varchar" })
  name: string;

  /**
   * relations
   */

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'role_id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id'
    }
  })
  users: User[];
}