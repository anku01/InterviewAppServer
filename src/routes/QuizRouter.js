import express from "express";
const router = express.Router();
import { getExamQuestions } from "./../controllers/QuizController";


router.route('/getExamQuestions')
    .post(getExamQuestions)

export default router;