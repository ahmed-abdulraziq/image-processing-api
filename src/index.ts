// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Request, Response } from "express";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import resizeImage from "./routes/imageRouter";

const app = express();
const port = 3000;

app.use("/api/images", resizeImage)

app.listen(port, () => {
  const pathThumb = `${path.resolve(__dirname,`../img/thumb/`)}`;

  existsSync(pathThumb) || mkdirSync(pathThumb);

  console.log(`Running on port ${port}`);
});

export default app;

