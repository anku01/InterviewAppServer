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

    let candidateId = req.body.candidateId;
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema, candidateId);

    ExamStatModel.find({}, function(err, examStat) {
        if(err) throw err;
        examResults.find({candidateId: candidateId}, function(err1, candidateData) {
            if(err1) throw err1;
            res.json({examStat:examStat, candidateData });
        });
    });

};
export { getExamResults, getExamDetails }