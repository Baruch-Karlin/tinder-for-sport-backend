// const { MongoClient } = require("mongodb");

// const url =
//   "mongodb+srv://dbUser:user000@cluster0.1t5ad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(url, { useUnifiedTopology: true });

// const dbName = "ourDb";
// let users_collection = "";

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected correctly to server");
//     const db = client.db(dbName);
//     console.log("db", db)
//     const col = db.collection("Users");
//     console.log("col", col)
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);


// const getAllUsers = async () => {
//     all_db_users = await users_collection.find().toArray();
//     return all_db_users;
//   };