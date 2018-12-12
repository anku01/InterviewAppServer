import mongoose from 'mongoose';
mongoose.set('debug',true);

import questionSchema from '../models/QuestionModel';
import quizSchema from '../models/QuizModel';
const questions = mongoose.model('question', questionSchema);
const quiz = mongoose.model('quiz', quizSchema);
import ExamStatSchema from '../models/ExamStat';
import { constants } from 'os';

const getExamQuestions = (req, res) => {   

    //temprary ids array
    let questionsIds = ['5c076b2150186c09ad6e1c1a', '5c076e6a50186c09ad6e1c1b', '5c08b48a0b96f2bdc082df45', '5c08c2a7dd892e1288ed222c'];

    questions.aggregate([
        { $match: { _id: { $nin: questionsIds } } },
        { $sample: {size: 1} }], (err, question) => {
        if(err){
            console.log("in error");
            res.send(err);
        }else{
            console.log("in else");
                for (var q of question) {
                    q._id = mongoose.mongo.ObjectId(q._id);
                    q.candidateID = req.body.candidateID
                  }
                quiz.insertMany( 
                    question
                );
                if(question.length)
                    res.json({quizs: question});
                else
                    res.json([]);
            
        }
    });
}

const startExam = (req, res) => {
    let candidateId = req.body.candidateID;
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema);
    var examData = new ExamStatModel ({
      candidateId: candidateId,
      stats: {
        
      },
      startTimeAndDate: Date.now()
    });
    examData.save(function(err) {
      if (err) throw err;
      return getExamQuestions({body: candidateId}, res);
    });
};

const submitTestAndGetResult = (req, res) =>{
    let quiz = req.body.exam;
    let candidateId = req.body.candidateData._id;
    console.log(candidateId,"req.body.candidateDat");
    // console.log(req.body);
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema);
    try {
         ExamStatModel.collection.drop();
      } catch (e) {
        if (e.code === 26) {
          console.log('namespace %s not found',ExamStatModel.collection.name)
        } else {
          throw e;
        }
      }
    console.log(quiz);
    
};

export { startExam, submitTestAndGetResult , getExamQuestions};