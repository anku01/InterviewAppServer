import express from "express";
const router = express.Router();
import { getExamResults, getExamDetails  } from "./../controllers/ExamResultController";

//exam/results
router.route('/results')
    .get(getExamResults);
router.route('/details')
    .post(getExamDetails);


export default router;