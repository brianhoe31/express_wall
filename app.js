var express = require("./application/node_modules/express");
var bodyParser = require("./application/node_modules/body-parser");
var route = require("./application/config/routes");
var session = require('express-session');

var app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/application/views'); 
app.set('view engine', 'ejs');

app.use(session({
    secret:'secret-key',
    resave: false,
    saveUninitialized: false
}))

app.use('/', route);

app.listen(8888, function() {
    console.log("listening on port 8888");
  })
  