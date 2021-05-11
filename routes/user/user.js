const express = require("express");
const bcrypt = require("bcrypt");
// const { upload } = require('../middlewares/imageUpload'); // for img
// const { uploadToCloudinary } = require('../lib/cloudinary'); // for img
// const fs = require('fs'); // for img
const jwt = require("jsonwebtoken");

const { users_collection } = require("../../database");
// const { MongoClient, ObjectID } = require("mongodb");
// const { auth } = require('../middlewares/auth'); autheçntication middle
// const { checkIfAdmin } = require('../middlewares/checkAdmin'); // admin middle
// const validationMiddleware = require('../middlewares/validation');
// const url =
//   "mongodb+srv://dbUser:user000@cluster0.1t5ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(url, { useUnifiedTopology: true });

// const dbName = "ourDb";
// let users_collection = "";

// async function run() {
//     try {
//       await client.connect();
//       const db = client.db(dbName);
//       users_collection = db.collection("Users");
//     } catch (err) {
//       console.log(err.stack);
//   }
// }
//   run().catch(console.dir);

const router = express.Router();

//mock data

const getAllUsers = async () => {
  const all_db_users = await users_collection.find().toArray();
  return all_db_users;
};

const mockUser = {
  firstName: "baruch",
  lastName: "baruch",
  email: "baruch@baruch.com",
  password_hash: "$2b$10$WWtl5qLj6A2bDAe.XpiqCeEbZ03wgr0L6.ayhxE/sDJHrAnrwrLum",
};

router.post("/user/chat", async (req, res, next) => {
  const { body } = req.body;
  res.status(200);
});

router.get("/users", (req, res) => {
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
