const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

let path = require("path");


const { MongoClient, ObjectID } = require("mongodb");
const url =
  "mongodb+srv://dbUser:user000@cluster0.1t5ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });

const dbName = "ourDb";
let users_collection = "";
let db
const run = async () => {
  try {
    await client.connect();
     db = client.db(dbName);
    // return db;
    // users_collection = db.collection("Users");
  } catch (err) {
    console.log(err.stack);
  }
}
run().catch(console.dir);
db.collection()




const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname));

app.use(cors());
app.use("/signUp", require("./routes/signUp/signUp"));
app.use("/logIn", require("./routes/logIn/logIn"));
app.use("/user", require("./routes/user/user"));







const port = 6000;
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`the server is listening at http://${host}:${port}`);
});
