import mongoose from 'mongoose';
import examSchema from '../models/ExamResultModel';
import ExamStatSchema from '../models/ExamStat';

const examResults = mongoose.model('examresults', examSchema);

const getExamResults = (req, res) => {   
    examResults.find({isDeleted: 0}, (err, results) => {
        if(err){
            res.send(err);
        }
        res.json(results);
    });
};

const getExamDetails = (req, res) => { 

    let testId = req.body.testId;
    examResults.findById(testId, function(err1, candidateData) {
        if(err1) throw err1;
        res.json({candidateData:candidateData});
    });

};

const removeExamDetails = (req, res) => {
    console.log("reqreqreqreqreq", req.body.examId);
    examResults.update( { "_id": req.body.examId },
   { "isDeleted": 1 }, function(err, resp){
       console.log(err, resp,"err, reserr, reserr, reserr, res");
       res.json(req.body);
   })
    
}
export { getExamResults, getExamDetails, removeExamDetails }