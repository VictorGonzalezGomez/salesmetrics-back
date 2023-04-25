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

describe("Store CRUD operations", () => {
    const testStore = {
        name: faker.name.firstName(),
        rut: faker.datatype.uuid(),
        email: faker.internet.email(),
        adress: faker.address.streetAddress(),
        industry: "food",
    };

    console.log("datos store", testStore);
    describe("POST /store", () => {
        it("POST /store should add a new store and return status code 200", async () => {
            const response = await request(server)
                .post("/store")
                .send(testStore);
            expect(response.status).toBe(201);
        });

        it("POST /store should return a 404 status code if store already exists", async () => {
            const response = await request(server).post("/store").send({
                name: "new Store 3",
                rut: "17550470-3",
                email: "new@store.com",
                address: "storeadress",
                industry: "food",
            });

            expect(response.status).toBe(404);
        });
        it("POST /store should return a 500 status code if fields are empty", async () => {
            const response = await request(server).post("/store").send({
                name: "",
                rut: "",
                email: "",
                address: "",
                industry: "",
            });
            expect(response.status).toBe(500);
        });
    });

    describe("GET /store", () => {
        it("GET /store should return status code 200", async () => {
            // send id and auth token
            // send auth token in header
            const response = await request(server).get("/store/5").send();
            expect(response.status).toBe(200);
        });

        it("GET /store should return an array of stores", async () => {
            const response = await request(server)
                .get("/store/5")
                .set("Authorization", jwt)
                .send();

            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe("PUT /store", () => {
        const idParActualizar = 16;
        it("PUT /store should return status code 200", async () => {
            // dejar con id dinamico
            const response = await request(server)
                .put(`/store/${idParActualizar}`)
                .set("Authorization", jwt)
                .send({
                    name: "test store",
                    address: "test store updated",
                });
            expect(response.status).toBe(200);
        });
    });

    describe("DELETE /store", () => {
        it("DELETE /store should return status code 200", async () => {
            const idToDelete = 9;
            const response = await request(server)
                .delete(`/store/${idToDelete}`)
                .set("Authorization", jwt)
                .send();
            expect(response.status).toBe(200);
        });
    });
});

