import express = require("express");
import { readFile } from "fs";
import path = require("path");
import sharp = require("sharp");

const resizeImage = express.Router();

resizeImage.get("/", (req: express.Request, res: express.Response) => {
    const filename: string = req.query.filename as string;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);
    const pathImage: string = `${path.resolve(
      __dirname,
      `../../img/${filename}.jpg`
    )}`;
    const pathThumbImage: string = `${path.resolve(
      __dirname,
      `../../img/thumb/${filename}-${height}x${width}.jpg`
    )}`;
  
    if (!filename || !width || !height) {
      res.status(400).send(`The following error occured processing your image remedy and try again: Error: Input file is missing`);
    } else {
      readFile(pathImage, async (err) => {
        if (err) res.status(404).send(`<h1>${err}</h1>`);
        else {
          try {
            await sharp(pathImage)
              .resize(width, height)
              .toFile(pathThumbImage);
            readFile(pathThumbImage, function (err, data) {
              if (err) res.status(400).send(err);
              else res.status(200).contentType("jpg").send(data);
            });
          } catch (err) {
            res.status(404).send(err);
          }
        }
      });
    }
  });
  export default resizeImage;