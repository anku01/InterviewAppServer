import express from "express";
import {
    addaQuestion, 
    getQuestions, 
    getQuestionById, 
    updateQuestion, 
    deleteQuestion
} from "./../controllers/QuestionController";

const router = express.Router();

    console.log("in questions route");

    // router.get('/adminLogin',(req, res, next)=>{
//   console.log("Response Received");
// })

    router.route('/questions')
    .get((req, _res, next)=> {
        console.log(`Request method ${req.method}`);
        next();
    }, getQuestions)

    .post(addaQuestion);

    router.route('/question')
    .post(getQuestionById)
    .put(updateQuestion)
    .delete(deleteQuestion);

export default router;