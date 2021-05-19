const supertest = require('supertest');
const app = require('../../server');

describe("signUp routes", () => {
    describe("POST/signUp", () => {
        beforeAll(async () => {
            
        });
        
        it("Should create a user", async () => {
           const response = await supertest(app).post('/signUp');
           expect(response.statusCode).toBe(200);
           expect(response.body).toEqual({
               user: {}
           })
        })
        it("Should return User already exists with this email", async () => {

        });
    });
});