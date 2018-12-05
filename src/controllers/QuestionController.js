import mongoose from 'mongoose';
import questionSchema from '../models/QuestionModel';

const questions = mongoose.model('question', questionSchema);
const addaQuestion = (req, res) => {
    console.log("added question", req.body.options);
    if(req.body.options){
        req.body.options = JSON.stringify(req.body.options)
    }
    let newQuestion = new questions(req.body);

    newQuestion.save((err, question) => {
        if(err){
            res.send(err);
        }
        res.json(question);
    });
};

const getQuestions = (req, res) => {   
    questions.find({}, (err, question) => {
        if(err){
            res.send(err);
        }
        res.json(question);
    });
};

const getQuestionById = (req, res) => {
    questions.findById(req.body.id, (err, question) => {
        if(err){
            res.send(err);
        }
        // question = JSON.parse(question);
        res.json(question);      
    });
};

const updateQuestion = (req, res) => {
    if(req.body.options){
        req.body.options = JSON.stringify(req.body.options)
    }
    questions.findOneAndUpdate({_id: req.body.id}, req.body, {new: true}, (err, question) => {
        if(err){
            res.send(err);
        }
        res.json(question);
    })
};

const deleteQuestion = (req, res) => {
    console.log(req.query.questionId,"reqreqreqreqreq");
    questions.findOneAndDelete({_id: req.query.questionId}, (err, question) => {
        if(err){
            res.send(err);
        }
        res.json({message: 'Successfully deleted a Question.'});
    })
}
export {addaQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion}