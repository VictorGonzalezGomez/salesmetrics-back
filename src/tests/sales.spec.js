const request = require("supertest");
const server = require("../../app");

const { faker } = require("@faker-js/faker");

describe("POST /sales", () => {
    it("POST /sales should return status code 201", async () => {
        const response = await request(server).post("/sales").send(
            [
                {
                    date: "2022-01-05 00:00:60",
                    id: 1,
                    product_id: 1,
                    product_description: 1,
                    store_id: 5,
                    total_sold: 1,
                    unit_price: 1,
                    units_sold: 1,
                },
                {
                    date: "2022-01-05 00:00:60",
                    id: 2,
                    product_id: 2,
                    product_description: 2,
                    store_id: 5,
                    total_sold: 2,
                    unit_price: 2,
                    units_sold: 2,
                }
            ]
            
        );
        expect(response.status).toBe(201);
    });

    describe("GET /sales", () => {
        it("GET /sales should return an array of sales", async () => {
            const response = await request(server).get("/sales").send();
            expect(response.body).toBeInstanceOf(Array);
        });
    });
});
