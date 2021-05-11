const express = require("express");
const bcrypt = require("bcrypt");
// const { upload } = require('../middlewares/imageUpload'); // for img
// const { uploadToCloudinary } = require('../lib/cloudinary'); // for img
// const fs = require('fs'); // for img
// const jwt = require("jsonwebtoken");

// const { auth } = require('../middlewares/auth'); authentication middle
// const { checkIfAdmin } = require('../middlewares/checkAdmin'); // admin middle
// 

const { MongoClient, ObjectID } = require("mongodb");
const url =
    "mongodb+srv://dbUser:user000@cluster0.1t5ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = "ourDb";
let dataBase;
let users_collection = "";

client.connect().then((response) => {
    if (response.topology.s.state) {
        console.log("Status: " + response.topology.s.state);
        const db = client.db(dbName);
        // Use the collection named "users"
        users_collection = db.collection("Users");
    } else {
        console.log("Problem connecting to MongoDB");
    }
});

console.log('5', client)

const router = express.Router();

const getAllUsers = async () => {
    const all_db_users = await users_collection.find().toArray();
    return all_db_users;
};

router.get("/users", (req, res) => {
    console.log('111')
    try {
        // Get all users from Mongo
        allUsers = getAllUsers().then((users) => {
            res.send(users);
        });
    } catch (err) {
        res.send(
            `We have error: ${err.stack}. Sorry. We appreciate your patience while we work this out.`
        );
    }
});
module.exports = router;