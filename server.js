const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use(cors());
app.use("/signUp", require("./routes/signUp/signUp"));
app.use("/logIn", require("./routes/logIn/logIn"));
app.use("/user", require("./routes/user/user"));
app.use("/notify", require("./routes/notify/notify"));

const port = 6000;
const host = "127.0.0.1";

mongoose
  .connect(
    "mongodb+srv://dbUser:user000@cluster0.1t5ad.mongodb.net/ourDb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((response) => {
    app.listen(port, host, () => {
      console.log(`the server is listening at http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
