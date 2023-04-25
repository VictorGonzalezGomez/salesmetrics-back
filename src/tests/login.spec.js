const request = require("supertest");
const server = require("../../app");

const { faker } = require("@faker-js/faker");

describe("/POST login", () => {
    it("POST /login should return status code 200 when login is ok", async () => {
        const response = await request(server).post("/login").send({
            email: "aaaadmin@admin.com",
            password: "Damagedonelpq09!",
        });
        expect(response.status).toBe(200);
    });

    it("POST /login should return a 500 status when invalid credentials are provided", async () => {
        const response = await request(server).post("/login").send({
            email: "invalid@mail.com",
            password: "invalidpassword",
        });

        expect(response.status).toBe(500);
    });

    it("POST /login should return a jwt token when login is ok", async () => {
        const response = await request(server).post("/login").send({
            email: "aaaadmin@admin.com",
            password: "Damagedonelpq09!",
        });
        // if token is not null, the token is there
        expect(response.body).not.toBeNull();
        
    });
});
