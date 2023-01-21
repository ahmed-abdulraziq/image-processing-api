import supertest from 'supertest';
import ResizeImage from '../helpers/resizeImage';
import path from 'path';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('gets the api/images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
});

const pathImage = `${path.resolve(__dirname, `../../assets/full/fjord.jpg`)}`;
const pathThumbImage = `${path.resolve(
  __dirname,
  `../../assets/thumb/fjord-500x500.jpg`
)}`;

describe('Image transform function should resolve or reject', (): void => {
  it('Expect transform to not throw error', async (): Promise<void> => {
    const image: Buffer = await ResizeImage(
      pathImage,
      pathThumbImage,
      500,
      500
    );

    expect(image).toBeInstanceOf(Buffer);
  });
  it('Expect transform to throw specific error', async (): Promise<void> => {
    await expectAsync(ResizeImage('', pathThumbImage, 500, 500)).toBeRejected();
  });
});
