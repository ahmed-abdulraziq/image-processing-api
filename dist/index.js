"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const imageRouter_1 = __importDefault(require("./routes/imageRouter"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/api/images', imageRouter_1.default);
app.listen(port, () => {
    const pathThumb = `${path_1.default.resolve(__dirname, `../img/thumb/`)}`;
    (0, fs_1.existsSync)(pathThumb) || (0, fs_1.mkdirSync)(pathThumb);
    console.log('Running on port', port);
});
exports.default = app;
