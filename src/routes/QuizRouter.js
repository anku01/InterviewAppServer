import express from "express";
const router = express.Router();
import { startExam, submitTestAndGetResult, getNextQuestion } from "./../controllers/QuizController";


router.route('/startExam')
    .post(startExam);
router.route('/submitExam')    
    .post(submitTestAndGetResult);
router.route('/getNextQuestion')    
    .post(getNextQuestion);

export default router;