import express from "express";
const router = express.Router();
import { getExamQuestions, submitTestAndGetResult } from "./../controllers/QuizController";


router.route('/getExamQuestions')
    .post(getExamQuestions);
router.route('/submitExam')    
    .post(submitTestAndGetResult);

export default router;