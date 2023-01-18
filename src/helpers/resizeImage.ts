import sharp from "sharp";
import { writeFile, readFile } from "fs/promises";

const ResizeImage = async (
  pathImage: string,
  pathThumbImage: string,
  height: number,
  width: number
): Promise<Buffer> => {
  const image: Buffer | null = await readFile(pathImage).catch(() => {
    return null;
  });

  if (!image) {
    return Promise.reject();
  }

  const resizeImage: Buffer | null = await sharp(pathImage)
    .resize(width, height)
    .toBuffer()
    .catch(() => {
      return null;
    });

  if (!resizeImage) {
    return Promise.reject();
  }

  const writeImage: Buffer = await writeFile(pathThumbImage, resizeImage)
    .then(() => {
      return resizeImage;
    })
    .catch(() => {
      return Promise.reject();
    });
    
  return writeImage;
};

export default ResizeImage;
