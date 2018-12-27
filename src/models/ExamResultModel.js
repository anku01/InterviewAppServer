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
    },
    isDeleted:{
        type: Number,
        default: 0
    }



});

export default ExamResultchema;