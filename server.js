const routes = require('./routes/routes.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 8000;

const dbURI = 'mongodb://localhost:27017/blogger-app';
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose
    .connect(dbURI, {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(function (res) {
        console.log("DB connected successfully...");
    })


app.use("/", routes);

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}/`);
});