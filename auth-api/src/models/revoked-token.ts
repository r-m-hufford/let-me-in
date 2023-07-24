import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, Column, BeforeInsert } from "typeorm";

@Entity("revoked_tokens")
@Unique(['token'])
export class RevokedTokens {
  @PrimaryGeneratedColumn()
  revokedTokenId: number;

  @Column()
  token: string;

  @Column()
  iat: Date;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}