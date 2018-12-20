import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const ExamResultchema = new Schema({
    candidateId: {
        type: String
    },
    score: {
        type: String
    },
    totalQuestions: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    submitedOn: {
        type: String
    }



});

export default ExamResultchema;