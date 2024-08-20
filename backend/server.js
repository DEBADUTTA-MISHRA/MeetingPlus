const express = require('express');
require('dotenv').config();
const app = express();
const mainRouter = require('./routes/index');
const PORT = process.env.PORT || 8000;
const bodyparser = require('body-parser');
const cors = require('cors');
const connectDB = require('./dbLayer/connection');

app.use(bodyparser.json());

const allowOrigin = ["*", "http://localhost:3000", "http://192.168.1.8:3000"];
const corsOpts = {
    origin: allowOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["content-type", "Authorization"],
};

app.use(cors(corsOpts));

connectDB();

app.get('/', (req, res) => {
    res.send("Welcome to Demo API");
});

app.use('/api', mainRouter);

app.listen(PORT, () => {
    console.log(`server running on port... http://localhost:${PORT}`);
});
