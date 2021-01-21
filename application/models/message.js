var pgp = require('pg-promise')(/* options */)
var db = require('../config/database');

class Message {
    createMessage(req, res) {
        let message = req.body.message;
        let user_id = req.session.userId;

        let query = "INSERT INTO messages (message, user_id, created_at, updated_at) VALUES ($1,$2,NOW(),NOW())";
        db.none(query, [message, user_id]);
    }

    getAllMessages(req, res) {
        let query = "SELECT messages.id, messages.message, messages.created_at, users.first_name, users.last_name FROM messages LEFT JOIN users ON messages.user_id = users.id";
        let result = db.result(query, null, r => r.rows)
            .then(data => {
                return data;
            })
            .catch(error => console.log(error));
        return result;
    }

    createComment(req, res) {
        let message_id = req.params.id;
        let comment = req.body.comment;
        let user_id = req.session.userId;

        let query = "INSERT INTO comments (comment, message_id, user_id, created_at, updated_at) VALUES($1,$2,$3,NOW(),NOW())";
        db.none(query, [comment, message_id, user_id]);
    }

    getAllComments(req, res) {
        let query = "SELECT * FROM comments LEFT JOIN users ON comments.user_id = users.id";
        let result = db.result(query, null, r => r.rows)
            .then(data => {
                return data;
            })
            .catch(error => console.log(error));
        return result;
    }
}

let message = new Message;

module.exports = message;

//create enableprofiler for every controller without middleware