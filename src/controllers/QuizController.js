import mongoose from 'mongoose';
import questionSchema from '../models/QuestionModel';
import quizSchema from '../models/QuizModel';
import ExamStatSchema from '../models/ExamStat';

const startExam = (req, res) => {
    let candidateId = req.body.candidateID;
    let ExamStatModel = mongoose.model(candidateId, ExamStatSchema);
    var examData = new ExamStatModel ({
      candidateId: candidateId,
      stats: {
        
      }
    });
    examData.save(function(err) {
      if (err) throw err;
       
    });
};

const submitTestAndGetResult = (req, res) =>{
    let quiz = req.body.exam;
    let candidateId = req.body.candidateID;;
    mongoose.connection.db.dropCollection(candidateId, function(err, result) {
      console.log('collection dropped');
    });
   
    // mongoose.connection.collections['1234'].drop( function(err) {
    //   console.log('collection dropped');
    // });
    console.log(quiz);
    
};

export { startExam, submitTestAndGetResult };