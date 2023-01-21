import express, { Request, Response } from 'express';
import { stat, readFile } from 'fs/promises';
import { Stats } from 'fs';
import path from 'path';
import resizeImage from '../helpers/resizeImage';

const imageRouter = express.Router();

imageRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  if (!height) {
    res.status(400).send('height does not exist');
    return;
  }

  if (!width) {
    res.status(400).send('width does not exist');
    return;
  }

  const pathImage = `${path.resolve(
    __dirname,
    `../../assets/full/${filename}.jpg`
  )}`;

  try {
    await stat(pathImage);
  } catch {
    res.status(404).send('Image does not exist');
    return;
  }

  const pathThumbImage = `${path.resolve(
    __dirname,
    `../../assets/thumb/${filename}-${height}x${width}.jpg`
  )}`;

  const existingThumbImage: Stats | null = await stat(pathThumbImage).catch(
    () => {
      return null;
    }
  );

  if (existingThumbImage) {
    try {
      const thumbImage: Buffer = await readFile(pathThumbImage);

      res.status(200).contentType('.jpg').send(thumbImage);
    } catch {
      res.status(500).send('Error occured processing the image');
    }
    return;
  }

  try {
    const image: Buffer = await resizeImage(
      pathImage,
      pathThumbImage,
      height,
      width
    );

    res.status(200).contentType('.jpg').send(image);
  } catch {
    res.status(500).send('Error occured processing the image');
  }
  return;
});

export default imageRouter;
