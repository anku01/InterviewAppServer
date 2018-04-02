import mongoose from 'mongoose';
import bookSchema from '../models/BookModel';

const books = mongoose.model('book', bookSchema);

const addaBook = (req, res) => {
    let newBook = new books(req.body);

    newBook.save((err, book) => {
        if(err){
            res.send(err);
        }
        res.json(book);
    });
};

const getBooks = (req, res) => {   
    books.find({}, (err, book) => {
        if(err){
            res.send(err);
        }
        res.json(book);
    });
};

const getBookById = (req, res) => {
    books.findById(req.params.bookId, (err, book) => {
        if(err){
            res.send(err);
        }
        res.json(book);      
    });
};

const updateBook = (req, res) => {
    books.findByIdAndUpdate({_id: req.params.bookId}, req.body, {new: true}, (err, book) => {
        if(err){
            res.send(err);
        }
        res.json(book);
    })
};

const deleteBook = (req, res) => {
    books.remove({_id: req.params.bookId}, (err, book) => {
        if(err){
            res.send(err);
        }
        res.json({message: 'Successfully deleted a book.'});
    })
}
export {addaBook, getBooks, getBookById, updateBook, deleteBook}