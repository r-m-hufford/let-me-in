import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user";
import { Permission } from "./permission";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ type: "varchar" })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  /**
   * relationships
   */

  @ManyToMany(
    () => User,
    user => user.roles
  )
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'roleId'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'userId'
    }
  })
  users: User[];

  @ManyToMany(
    () => Permission,
    permission => permission.roles
  )
  @JoinTable({
    name: "role_permission",
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'roleId'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'permissionId'
    }
  })
  permissions: Permission[];
}