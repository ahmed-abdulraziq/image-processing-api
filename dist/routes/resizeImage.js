"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs_1 = require("fs");
const path = require("path");
const sharp = require("sharp");
const resizeImage = express.Router();
resizeImage.get("/", (req, res) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const pathImage = `${path.resolve(__dirname, `../../img/${filename}.jpg`)}`;
    const pathThumbImage = `${path.resolve(__dirname, `../../img/thumb/${filename}-${height}x${width}.jpg`)}`;
    if (!filename || !width || !height) {
        res.status(400).send(`The following error occured processing your image remedy and try again: Error: Input file is missing`);
    }
    else {
        (0, fs_1.readFile)(pathImage, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                res.status(404).send(`<h1>${err}</h1>`);
            else {
                try {
                    yield sharp(pathImage)
                        .resize(width, height)
                        .toFile(pathThumbImage);
                    (0, fs_1.readFile)(pathThumbImage, function (err, data) {
                        if (err)
                            res.status(400).send(err);
                        else
                            res.status(200).contentType("jpg").send(data);
                    });
                }
                catch (err) {
                    res.status(404).send(err);
                }
            }
        }));
    }
});
exports.default = resizeImage;
