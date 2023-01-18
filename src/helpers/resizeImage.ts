import sharp from "sharp";
import { writeFile, readFile } from "fs/promises";

const ResizeImage = async (
  pathImage: string,
  pathThumbImage: string,
  height: number,
  width: number
): Promise<Buffer> => {
  try {
    await readFile(pathImage);

    const resizeImage: Buffer = await sharp(pathImage)
      .resize(width, height)
      .toBuffer();

    const writeImage: Buffer = await writeFile(
      pathThumbImage,
      resizeImage
    ).then(() => {
      return resizeImage;
    });

    return writeImage;
  } catch {
    return Promise.reject();
  }
};

export default ResizeImage;
