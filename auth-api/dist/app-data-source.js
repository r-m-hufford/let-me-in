"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: 'postgresql://ryanmhufford@localhost:6543/auth_app',
    entities: ["src/models/*.ts"],
    logging: false,
    synchronize: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
});
