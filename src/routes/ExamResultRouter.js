import express from "express";
const router = express.Router();
import { getExamResults  } from "./../controllers/ExamResultController";

//exam/results
router.route('/results')
    .get(getExamResults);


export default router;