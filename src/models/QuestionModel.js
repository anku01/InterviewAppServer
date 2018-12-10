import mongoose from 'mongoose';

const question = mongoose.Schema;

const questionSchema = new question({
    q_type: {
        type: String,
        required: 'select the answer type'
       },
    q_text: {
        type: String,
        required: 'Enter the book title.'
    },
    options: {
        type: mongoose.Schema.Types.Mixed,
        required: 'Enter the options'
    },
    // option_correct: {
    //     type: String,
    //     required: 'Enter the correct answer'
    // },
    severity: {
        type: Number,
       
    },
    technology: {
        type: String,
        
    },
},{collection:'question'});

export default questionSchema;