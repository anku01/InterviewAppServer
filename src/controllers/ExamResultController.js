import mongoose from 'mongoose';
import examSchema from '../models/ExamResultModel';
import ExamStatSchema from '../models/ExamStat';

const examResults = mongoose.model('examresults', examSchema);

const getExamResults = (req, res) => {   
    examResults.find({}, (err, results) => {
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
export { getExamResults, getExamDetails }