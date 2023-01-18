"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const resizeImage_1 = __importDefault(require("../helpers/resizeImage"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint response', () => {
    it('gets the api/images endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(400);
    }));
});
const pathImage = `${path_1.default.resolve(__dirname, `../../img/fjord.jpg`)}`;
const pathThumbImage = `${path_1.default.resolve(__dirname, `../../img/thumb/fjord-500x500.jpg`)}`;
describe('Image transform function should resolve or reject', () => {
    it('Expect transform to not throw error', () => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield (0, resizeImage_1.default)(pathImage, pathThumbImage, 500, 500);
        expect(image).toBeInstanceOf(Buffer);
    }));
    it('Expect transform to throw specific error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizeImage_1.default)('', pathThumbImage, 500, 500)).toBeRejected();
    }));
});
