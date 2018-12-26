import mongoose from 'mongoose';

const question = mongoose.Schema;

const questionSchema = new question({
    q_type: {
        type: String,
        required: 'select the answer type'
    },
    question: {
        text: {
            type: String,
            required: 'Question is required.'
        },
        hasCode: {
            type: Boolean,
            default: true
        },
        code: {
            type: String
        }
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