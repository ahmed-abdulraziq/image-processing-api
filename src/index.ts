import express = require("express");
import { mkdir } from "fs";
import path = require("path");
import resizeImage from "./routes/resizeImage";

const app = express();
const port = 3000;
const pathThumb: string = `${path.resolve(__dirname,`../img/thumb/`)}`;

app.use("/api/images", resizeImage)

app.listen(port, () => {
  console.log(`Running on port ${port}`);
  mkdir(pathThumb, (err) => {
    if (err) console.log(err);
    else console.log("Create Thumb")
  })
});

export default app;