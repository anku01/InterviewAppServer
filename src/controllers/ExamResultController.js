import mongoose from 'mongoose';
import examSchema from '../models/ExamResultModel';

const examResults = mongoose.model('examresults', examSchema);

const getExamResults = (req, res) => {   
    examResults.find({}, (err, results) => {
        if(err){
            res.send(err);
        }
        res.json(results);
    });
};

export { getExamResults }