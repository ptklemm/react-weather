const request = require("supertest");
const app = require("./app.js");

describe("API Route Testing", () => {
	test("GET /api responds with 404 Not Found", async () => {
		const response = await request(app).get("/api");
		expect(response.status).toBe(404);
	});

	test("GET /api/current responds with 200 OK", async () => {
		const response = await request(app).get("/api/current").query("q=London");
		expect(response.status).toBe(200);
	});

	test("GET /api/forecast responds with 200 OK", async () => {
		const response = await request(app).get("/api/forecast").query("q=London");
		expect(response.status).toBe(200);
	});
});
