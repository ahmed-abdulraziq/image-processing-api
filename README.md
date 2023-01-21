# Image processing API

It is an express server which is able to take images located in a folder and create a resized thumb version of it and save it on the disk. Once created a thumb version it just serves the processed image through the api endpoint.

> Create thumb version of image

```http
  GET /api/images/?filename={filename: String}&height={height: Number}&width={width: Number}
```

## Scripts

Start the dev server

```bash
  npm run dev
```

Build the project

```bash
  npm run build
```

Run the application

```bash
  npm run start
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/ahmed-abdulraziq/image-processing-api.git
```

Go to the project directory

```bash
  cd image-processing-api
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
