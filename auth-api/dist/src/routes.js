"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
function routes(app) {
    app.use('/api/auth', auth_1.authRouter);
    app.use('/api/users', users_1.userRouter);
}
exports.routes = routes;
