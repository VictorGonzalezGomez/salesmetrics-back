const request = require("supertest");
const server = require("../../app");

const { faker } = require("@faker-js/faker");

// create a function that login and returns a token
const login = async () => {
    const response = await request(server).post("/login").send({
        email: "aaaadmin@admin.com",
        password: "Damagedonelpq09!",
    });
    return response.body;
};

const jwt = login();

const testRegister = {
    email: faker.internet.email(),
    password: "123456",
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    store_name: faker.name.firstName(),
    rut: faker.datatype.uuid(),
    industry: "food",
    address: faker.address.streetAddress(),
    store_email: faker.internet.email(),
};

describe("POST /register", () => {
    it("Should register a new store and user and return a status 200", async () => {
        const response = await request(server).post("/register").send(testRegister);

        expect(response.status).toBe(200);
    });

    it("Should return a 404 status code if user already exists", async () => {
        const response = await request(server).post("/register").send(testRegister);

        expect(response.status).toBe(404);
    });

    it("should return a 500 status code if fields are empty", async () => {
        const response = await request(server).post("/register").send({
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            store_name: "",
            rut: "",
            industry: "",
            address: "",
            store_email: "",
        });

        expect(response.status).toBe(500);
    });
});
