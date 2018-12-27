import express from "express";
const router = express.Router();
import { getExamResults, getExamDetails, removeExamDetails  } from "./../controllers/ExamResultController";

//exam/results
router.route('/results')
    .get(getExamResults);
router.route('/details')
    .post(getExamDetails);
router.route('/delete')
    .post(removeExamDetails);


export default router;