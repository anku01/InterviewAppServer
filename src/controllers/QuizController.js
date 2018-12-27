import mongoose from 'mongoose';
import async from 'async';
mongoose.set('debug',true);

import questionSchema from '../models/QuestionModel';
const questions = mongoose.model('question', questionSchema);

import ExamResultSchema from '../models/ExamResultModel';
const ExamResult = mongoose.model('ExamResult', ExamResultSchema);

import ExamStatSchema from '../models/ExamStat';
import { constants } from 'os';

const getExamQuestions = (req, res) => {   

    let candidateId = req.body.candidateId;
    let questionId = req.body.questionId;
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema, candidateId);
    if (questionId) {
        ExamStatModel.findById(questionId, function (err, question) {
            if (err) throw err;
            if(question)
                res.json({quizs: [question.question]});
            
          });
    } else {
        let questionsIds = [];
        ExamStatModel.find({}, function(err, examStat) {
            examStat.forEach(function(stat) {
                questionsIds.push(stat._id);
            });
            questions.aggregate([
                { $match: { _id: { $nin: questionsIds } } },
                { $sample: {size: 1} }], (err, question) => {
                if(err){
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
    mongoose.connection.db.listCollections({name: candidateId})
    .next(function(err, collinfo) {
        if (collinfo) {
            mongoose.connection.collection(candidateId).remove({}, function(){})
        }
        return getExamQuestions({body: {
            candidateId: candidateId,
            questionId: req.body.questionId
        }}, res);
    });
};

const submitTestAndGetResult = (req, res) =>{
    let candidateId = req.body.candidateData._id;
    let email = req.body.candidateData.email;
    let contact = req.body.candidateData.contact;

    let score = 0;
    let totalQuestions = 15;

    // console.log(candidateId,"req.body.candidateDat");
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema, candidateId);
    
        ExamStatModel.find({}, function(err, examStat) {
            totalQuestions = req.body.totalNoOfQuestions;
            async.eachSeries(examStat, (qtion, callback) => {
                    console.log(examStat,"examStat");
                    qtion.question.options.forEach(function (opn, index) {
                        // console.log(qtion.question.answer,"opn.answer===index", index, "===key", opn.isCorrect)
                        if(qtion.question.answer===index &&  opn.isCorrect ===true){
                            score = score + 1
                        }
                        // console.log(sandwich);
                    });
                    callback();
            }, err => {
                if (err) res.json(err);
                
                let ResultData = new ExamResult({
                    candidateId: candidateId,
                    score: score, 
                    contact: contact,
                    email: email,
                    totalQuestions: totalQuestions,
                    submitedOn: new Date(),
                    testData: examStat
                });
                ResultData.save(function(err) {
                    if (err) throw err;
                    res.json({candidateId: candidateId, score: score, totalQuestions: totalQuestions });
                });
            });
        });
        ExamStatModel.collection.drop();
         
     
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
            // console.log('inside null')
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