import express, { Request, Response } from 'express';
import { stat, readFile } from 'fs/promises';
import { Stats } from 'fs';
import path from 'path';
import resizeImage from '../helpers/resizeImage';

const imageRouter = express.Router();

imageRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (!height) {
    res.status(400).send('height does not exist');
    return;
  }

  if (!width) {
    res.status(400).send('width does not exist');
    return;
  }

  const pathImage = `${path.resolve(__dirname, `../../img/${filename}.jpg`)}`;

  try {
    await stat(pathImage);
  } catch {
    res.status(404).send('Image does not exist');
    return;
  }

  const pathThumbImage = `${path.resolve(
    __dirname,
    `../../img/thumb/${filename}-${height}x${width}.jpg`
  )}`;

  const existingThumbImage: Stats | null = await stat(pathThumbImage).catch(
    () => {
      return null;
    }
  );

  if (existingThumbImage) {
    readFile(pathThumbImage)
      .then((thumbImage: Buffer) => {
        res.status(200).contentType('.jpg').send(thumbImage);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });

    return;
  } else {
    resizeImage(pathImage, pathThumbImage, height, width)
      .then((image: Buffer) => {
        res.status(200).contentType('.jpg').send(image);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });

    return;
  }
});

export default imageRouter;
