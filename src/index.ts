// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Request, Response } from 'express';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import resizeImage from './routes/imageRouter';

const app = express();
const port = 3000;

app.use('/api/images', resizeImage);

app.listen(port, () => {
  const pathThumb = `${path.resolve(__dirname, `../assets/thumb/`)}`;

  existsSync(pathThumb) || mkdirSync(pathThumb);

  // eslint-disable-next-line no-console
  console.log('Running on port', port);
});

export default app;
