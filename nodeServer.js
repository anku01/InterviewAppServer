import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import questionRoute from "./src/routes/QuestionRouter";
import userRoute from "./src/routes/UserRouter";
import quizRoute from "./src/routes/QuizRouter";

const app = express();
const PORT = 4000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin123@ds129904.mlab.com:29904/interview-module', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/QuizDB', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(`Hello welcome to node with es6 ${PORT}`)
});
app.use('/userRoute', userRoute );
app.use('/quizRoute', quizRoute);
app.use('/questionRoute', questionRoute);


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
