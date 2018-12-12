import express from "express";
const router = express.Router();
import { startExam, submitTestAndGetResult } from "./../controllers/QuizController";


router.route('/startExam')
    .post(startExam);
router.route('/submitExam')    
    .post(submitTestAndGetResult);

export default router;