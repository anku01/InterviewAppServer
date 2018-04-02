let express = require("express");
let router = express.Router();

router.get('/', function(req, res){
    res.send("<h1>Welcome to the GSPANN book library</h1>");
});

module.exports = router;
