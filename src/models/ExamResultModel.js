import mongoose, { Mongoose } from 'mongoose';
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
    },
    testData: {
        type: Schema.Types.Mixed
    }



});

export default ExamResultchema;