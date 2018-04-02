let express = require("express");
let route = express.Router();

route.get('/books', function(req, res){
    var bookData = req.app.get('appData');

    res.send(JSON.stringify(bookData));
});

route.get('/books/:bookId', function(req, res) {
    var bookData = req.app.get('appData');
    
    res.send(bookData[req.params.bookId]);
});

route.post('/book', function(req, res) {
    
})

module.exports = route;