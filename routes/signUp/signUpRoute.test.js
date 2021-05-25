require('../../lib/config');

const User = require('../user/mongoose_modle/user')
const supertest = require('supertest');
const faker = require("faker");

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = require('../../server');

describe('signup route test', () => {
    describe('app is defined', () => {
        it('will not fail', () => {
            expect(true).toBe(true);
        });
        it('has a module', () => {
            expect(app).toBeDefined();
        });
    });

    describe('POST/ signUp', () => {

        afterEach(async () => {
            await User.deleteMany()
        })
        afterAll(done => {
            mongoose.connection.close();
            // server.close(done);
        });
        it('should create a user', async () => {
            const user = {
                email: faker.internet.email(),
                password: '12345678',
                confirmPassword: '12345678',
            };
            const response = await supertest(app)
                .post('/signUp')
                .send({ user });
            expect(response.statusCode).toBe(200);
            expect(response.body.user.email).toBeTruthy();
            expect(response.body.user.hash_password).toBeTruthy();
            expect(response.body.token).toBeTruthy();
        });

        it('should return 400 statusCode if no email', async () => {
            const user = {
                password: '12345678',
                confirmPassword: '12345678',
            };
            const response = await supertest(app)
                .post('/signUp')
                .send({ user });
            console.log(response)
            expect(response.statusCode).toBe(400);
        });

        it('should return 404 statusCode if passwords dont match', async () => {
            const user = {
                email: faker.internet.email(),
                password: '12345678',
                confirmPassword: '12345676669',
            };
            const response = await supertest(app)
                .post('/signUp')
                .send({ user });
            expect(response.statusCode).toBe(404);
            expect(response.error.text).toBe("passwords do not match");
        });

        it('should return 403 if user with password exists', async () => {
            const user = {
                email: 'admin@admin.com',
                password: '12345678',
                confirmPassword: '12345678',
            };
            const response = await supertest(app)
                .post('/signUp')
                .send({ user });
            const responseSecondUser = await supertest(app)
                .post('/signUp')
                .send({ user });
            expect(responseSecondUser.statusCode).toBe(403);
            expect(responseSecondUser.error.text).toBe("User already exists with this email");
        });
    });
});
