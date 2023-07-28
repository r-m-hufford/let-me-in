import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from "./src/models/user";
import { RevokedTokens } from "./src/models/revoked-token";


export const myDataSource = new DataSource({
    type: "postgres",
    url: 'postgresql://ryanmhufford@localhost:6543/auth_app',
    entities: [User, RevokedTokens],
    migrations: ['./src/migration'],
    migrationsTableName: 'migrations',
    logging: true,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy()
})