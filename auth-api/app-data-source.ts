import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


export const myDataSource = new DataSource({
    type: "postgres",
    url: 'postgresql://ryanmhufford@localhost:6543/auth_app',
    entities: ["src/models/*.ts"],
    logging: false,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
})