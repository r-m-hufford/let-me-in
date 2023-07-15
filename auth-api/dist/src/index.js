"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app_data_source_1 = require("../app-data-source");
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log('data source initialized');
})
    .catch((err) => {
    console.error('error initializing data source:', err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api', (req, res) => {
    res.send('Express and Typescript Server. hot diggity.');
});
(0, routes_1.routes)(app);
app.listen(3000, () => {
    console.log('listening on 3000');
});
