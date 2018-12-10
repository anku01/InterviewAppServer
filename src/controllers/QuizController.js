import mongoose from 'mongoose';
import questionSchema from '../models/QuestionModel';
import quizSchema from '../models/QuizModel';
const questions = mongoose.model('question', questionSchema);
// const quiz = mongoose.model('quiz', quizSchema);

const getExamQuestions = (req, res) => {   
    questions.aggregate([{ $sample: {size: req.body.size} }], (err, question) => {
        if(err){
            console.log("in error")
            res.send(err);
        }else{
            console.log("in else")
                // let quizs = 
                // for (var q of question) {
                //     q._id = mongoose.mongo.ObjectId(q._id);
                //   }
                // quiz.insertMany( 
                //     question
                // );
                if(question.length)
                    res.json({quizs: question});
                else
                    res.json([]);
            
        }
        
    });
};

export { getExamQuestions };