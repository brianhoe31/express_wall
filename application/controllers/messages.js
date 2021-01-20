var messageModel = require('../models/message');

class Messages {
    addMessage(req, res) {
        //send message to the message model 
        messageModel.createMessage(req, res);
        res.redirect('/wall');
    }

    addComment(req, res) {
        messageModel.createComment(req, res);
        res.redirect('/wall');
    }
}

let messages = new Messages;

module.exports = messages;