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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const resizeImage_1 = __importDefault(require("../helpers/resizeImage"));
const imageRouter = express_1.default.Router();
imageRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    if (!filename || !width || !height) {
        res
            .status(400)
            .send(`The following error occured processing your image remedy and try again: Error: Input file is missing`);
        return;
    }
    const pathImage = `${path_1.default.resolve(__dirname, `../../img/${filename}.jpg`)}`;
    const image = yield (0, promises_1.stat)(pathImage).catch(() => {
        return null;
    });
    if (!image) {
        res.status(404).send("Image does not exist");
        return;
    }
    const pathThumbImage = `${path_1.default.resolve(__dirname, `../../img/thumb/${filename}-${height}x${width}.jpg`)}`;
    const existingThumbImage = yield (0, promises_1.stat)(pathThumbImage).catch(() => {
        return null;
    });
    if (existingThumbImage) {
        (0, promises_1.readFile)(pathThumbImage)
            .then((thumbImage) => {
            res.status(200).contentType(".jpg").send(thumbImage);
        })
            .catch(() => {
            res.status(500).send("Error occured processing the image");
        });
        return;
    }
    else {
        (0, resizeImage_1.default)(pathImage, pathThumbImage, height, width)
            .then((image) => {
            res.status(200).contentType(".jpg").send(image);
        })
            .catch(() => {
            res.status(500).send("Error occured processing the image");
        });
        return;
    }
}));
exports.default = imageRouter;
