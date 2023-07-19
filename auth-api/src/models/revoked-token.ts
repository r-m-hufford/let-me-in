import { version } from "punycode";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, Column, BeforeInsert } from "typeorm";

@Entity()
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

  @BeforeInsert()
  prepForInsert() {
    // convert iat and expires at to dates
  }
}