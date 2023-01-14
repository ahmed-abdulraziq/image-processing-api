"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs_1 = require("fs");
const path = require("path");
const resizeImage_1 = __importDefault(require("./routes/resizeImage"));
const app = express();
const port = 3000;
const pathThumb = `${path.resolve(__dirname, `../img/thumb/`)}`;
app.use("/api/images", resizeImage_1.default);
app.listen(port, () => {
    console.log(`Running on port ${port}`);
    (0, fs_1.mkdir)(pathThumb, (err) => {
        if (err)
            console.log(err);
        else
            console.log("Create Thumb");
    });
});
exports.default = app;
