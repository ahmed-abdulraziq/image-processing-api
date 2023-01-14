import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Test endpoint response", () => {
    it("gets the api/images endpoint", async () => {
        const response = await request.get("/api/images");
        expect(response.status).toBe(400);
    })
})
describe("Image transform function should resolve or reject", () => {
    it("Expect transform to not throw error", async () => {
        const response = await request.get("/api/images?filename=fjord&height=200&width=500");
        expect(response.status).toBe(200);
    })
    it("Expect transform to throw specific error", async () => {
        const response = await request.get("/api/images?filename=fjord0&height=200&width=500");
        expect(response.status).toBe(404);
    })
})