var express = require('express');
var app = express();
var router = express.Router();
var main = require('../controllers/main');
var users = require('../controllers/users');
var messages = require('../controllers/messages');

router.get('/', function (req, res) {
    main.loadIndex(req, res);
})

router.get('/wall', function (req, res) {
    main.loadWall(req, res);
})

// =========================
// user sign-in routes
// =========================
router.get('/login', function (req, res) {
    users.loadLogin(req, res);
})

router.get('/register', function (req, res) {
    users.loadRegister(req, res);
})

router.get('/logout', function (req, res) {
    users.logout(req, res);
})

router.post('/register', function (req, res) {
    users.register(req, res);
})

router.post('/login', function (req, res) {
    users.login(req, res);
})

// =========================
// message routes
// =========================
router.post('/message/new', function (req, res) {
    messages.addMessage(req, res);
})

router.post('/message/:id/comment/new', function (req, res) {
    messages.addComment(req, res);
})


module.exports = router