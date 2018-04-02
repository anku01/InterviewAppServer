import {
    addaBook, 
    getBooks, 
    getBookById, 
    updateBook, 
    deleteBook,
} from '../controllers/BookController';

const routes = (app) => {
    app.route('/books')
    .get((req, res, next)=> {
        console.log(`Request method ${req.method}`);
        next();
    }, getBooks)

    .post(addaBook);

    app.route('/book/:bookId')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook);
} 

export default routes;