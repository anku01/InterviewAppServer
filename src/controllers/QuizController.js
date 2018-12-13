import mongoose from 'mongoose';
mongoose.set('debug',true);

import questionSchema from '../models/QuestionModel';
const questions = mongoose.model('question', questionSchema);
import ExamStatSchema from '../models/ExamStat';
import { constants } from 'os';

const getExamQuestions = (req, res) => {   

    let candidateId = req.body.candidateId;
    let questionId = req.body.questionId;
    console.log('***', req.body)
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema, candidateId);
    if (questionId) {
        ExamStatModel.findById(questionId, function (err, question) {
            if (err) throw err;
            console.log(question,"###############");
            if(question)
                res.json({quizs: [question.question]});
            
          });
    } else {
        let questionsIds = [];
        ExamStatModel.find({}, function(err, examStat) {
            examStat.forEach(function(stat) {
                questionsIds.push(stat._id);
            });
            console.log('ids ', questionsIds);
            questions.aggregate([
                { $match: { _id: { $nin: questionsIds } } },
                { $sample: {size: 1} }], (err, question) => {
                if(err){
                    console.log("in error");
                    res.send(err);
                } else {
                    for (var q of question) {
                        q._id = mongoose.mongo.ObjectId(q._id);
                        q.candidateID = req.body.candidateID
                        }
                    if(question.length)
                        res.json({quizs: question});
                    else
                        res.json([]);
                    
                }
            });
        });
    }
}

const startExam = (req, res) => {
    let candidateId = req.body.candidateID;
    mongoose.connection.db.listCollections({name: candidateId + 's'})
    .next(function(err, collinfo) {
        if (collinfo) {
            mongoose.connection.collection(candidateId + 's').remove({}, function(){
                console.log('collection empty');
            })
        }
        return getExamQuestions({body: {
            candidateId: candidateId,
            questionId: req.body.questionId
        }}, res);
    });
};

const submitTestAndGetResult = (req, res) =>{
    let candidateId = req.body.candidateData._id;
    console.log(candidateId,"req.body.candidateDat");
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema, candidateId);
    try {
         ExamStatModel.collection.drop();
      } catch (e) {
        if (e.code === 26) {
          console.log('namespace %s not found',ExamStatModel.collection.name)
        } else {
          throw e;
        }
      }
      res.send('Submitted');
};

const getNextQuestion = (req, res) =>{
    let candidateId = req.body.candidateID;
    let stats = {
        _id: req.body.stats.question[0]._id,
        question: req.body.stats.question[0]
    };
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema, candidateId);
    var examData = new ExamStatModel (stats);
    ExamStatModel.findById(stats._id, function (err, question) {
        if (err) throw err;
        if(question){
            console.log('inside null')
            question.question = stats.question;
            question.save(function(err, data) {
                if (err) throw err;
                return getExamQuestions({
                    body: {
                        candidateId: candidateId,
                        questionId: req.body.questionId
                    }
                }, res);
            })  
        } else{
            examData.save(function(err) {
                if (err) throw err;
                return getExamQuestions({
                    body: {
                        candidateId: candidateId,
                        questionId: req.body.questionId
                    }
                }, res);
            });
        }
        
      });

    

};

export { startExam, submitTestAndGetResult, getNextQuestion};