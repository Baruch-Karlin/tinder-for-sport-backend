require('../../lib/config');
const mongoose = require('mongoose');
const mongoDb = "mongodb://127.0.0.1/test_db";
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const User = require('../user/mongoose_modle/user')

describe("User model test", () => {
    beforeAll(async () => {
        await User.remove({});
    });
    afterEach(async () => {
        await User.remove({});
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    it("will not fail", () => {
        expect(true).toBe(true);
    });
    it("Has a module", () => {
        expect(User).toBeDefined();
    });

    describe('save a user', () => {
        it('saves a user', async () => {
            const id = mongoose.Types.ObjectId();
            const user = new User({
                _id: id,
                first_name: "admin",
                email: "admin@admin.com"
            });
            const savedUser = await user.save();
            const expected = "admin";
            const actual = savedUser.first_name;
            expect(actual).toEqual(expected);
        });
    });
    describe('get a user', () => {
        it('gets a user', async () => {
            const id = mongoose.Types.ObjectId();
            const user = new User({
                _id: id,
                first_name: "admin",
                email: "admin@admin.com"
            });
            await user.save();
            const foundUser = await User.findOne({ first_name: "admin"});
            const expected = "admin";
            const actual = foundUser.first_name;
            expect(actual).toEqual(expected);
        });
    });
});




