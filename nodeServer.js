import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/BookRouter";

const app = express();
const PORT = 4000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/LibDB');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
    res.send(`Hello welcome to node with es6 ${PORT}`)
});

app.listen(PORT, () => 
    console.log(`Server is running on ${PORT}`)  
);






// let express = require("express");
// let app = express();

// let bookData = require('./data/books.json');

// app.set('port', process.env.PORT || 4000);
// app.set('appData', bookData);

// app.use(require('./routes/welcome'));
// app.use(require('./routes/book'));

// app.listen(app.get('port'), () => console.log("Listing on port", app.get('port')));