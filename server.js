const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());
app.use('/signUp', require('./routes/signUp/signUp'));
app.use('/logIn', require('./routes/logIn/logIn'));
app.use('/user', require('./routes/user/user'));




const port = 6000;
const host = "127.0.0.1";

app.listen(port, host, () => {
    console.log(`the server is listening at http://${host}:${port}`);
});