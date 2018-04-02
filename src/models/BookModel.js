import mongoose from 'mongoose';

const book = mongoose.Schema;

const bookSchema = new book({
    title: {
        type: String,
        required: 'Enter the book title.'
    },
    author: {
        type: String,
        required: 'Enter the author.'
    },
    price: {
        type: Number,
        required: 'Enter the book title.'
    },
    type: {
        type: String,
        required: 'Enter the book title.'
    },
    description: {
        type: String
    },
    copies: {
        type: String
    },
    publisher: {
        type: String,
        required: 'Enter the publishing house.'
    },
    language: {
        type: String
    },
    publishing_date: {
        type: Date
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export default bookSchema;