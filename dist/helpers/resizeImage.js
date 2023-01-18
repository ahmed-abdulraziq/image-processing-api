'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const sharp_1 = __importDefault(require('sharp'));
const promises_1 = require('fs/promises');
const ResizeImage = (pathImage, pathThumbImage, height, width) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0, promises_1.readFile)(pathImage);
      const resizeImage = yield (0, sharp_1.default)(pathImage)
        .resize(width, height)
        .toBuffer();
      const writeImage = yield (0, promises_1.writeFile)(
        pathThumbImage,
        resizeImage
      ).then(() => {
        return resizeImage;
      });
      return writeImage;
    } catch (_a) {
      return Promise.reject();
    }
  });
exports.default = ResizeImage;
