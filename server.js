const path = require('path');
console.log(process.env.NODE_ENV);
const result = require('dotenv').config({
    path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),// maybe change here
});
if (result.error) {
    throw new Error(result.error);
}


const express = require("express");
const pino = require('pino-http');
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(cors());
app.use("/signUp", require("./routes/signUp/signUp"));
app.use("/logIn", require("./routes/logIn/logIn"));
app.use("/user", require("./routes/user/user"));
app.use("/notify", require("./routes/notify/notify"));
app.use("/chat", require("./routes/chat/chat"));


app.get('/', (req, res) => {
    req.log.debug
    res.send(`Hello world from ${process.env.NODE_ENV}`);
});

const port = +process.env.PORT;
const host = process.env.HOST;

module.exports = app;

mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((response) => {
        console.log('your data base is ' + response.connections[0].name)
        if (process.env.NODE_ENV !== "test") {
            app.listen(port, host, () => {
                console.log(`the server is listening at http://${host}:${port}`);
            });
        }
    }).catch((err) => { console.log(err) })

