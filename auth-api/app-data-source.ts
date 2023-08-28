import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from "./src/models/user";
import { RevokedToken } from "./src/models/revoked-token";
import { Permission } from "./src/models/permission";
import { Role } from "./src/models/role";


export const myDataSource = new DataSource({
    type: "postgres",
    url: 'postgresql://ryanmhufford@localhost:6543/auth_app',
    entities: [User, RevokedToken, Role, Permission],
    migrations: ['./src/migration'],
    migrationsTableName: 'migrations',
    logging: false,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy()
})