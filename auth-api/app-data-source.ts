import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from "./src/models/user";


export const myDataSource = new DataSource({
    type: "postgres",
    url: 'postgresql://ryanmhufford@localhost:6543/auth_app',
    entities: [User],
    logging: false,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
})