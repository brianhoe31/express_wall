var md5 = require('md5');
var db = require('../config/database');

class User {
    validateRegistration(req, res) {
        let error = [];

        if (!req.body.first_name || !req.body.last_name) {
            error.push("First & Last name can't be empty");
        }
        if (!req.body.email) {
            error.push("Email can't be empty");
        }

        if (!req.body.password || !req.body.confirm_password) {
            error.push("Password can't be empty");
        }
        if (req.body.password.length < 3) {
            error.push("Password must be at least 3 characters");
        }
        if (req.body.password !== req.body.confirm_password) {
            error.push("Passwords need to match");
        }
        return error;
    }

    validateLogin(req, res) {
        let error = [];
        if (!req.body.email) {
            error.push("Email can't be empty");
        }

        if (!req.body.password) {
            error.push("Password can't be empty");
        }
        if (req.body.password.length < 3) {
            error.push("Password must be at least 3 characters");
        }
        return error;
    }

    createUser(req, res) {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let password = md5(req.body.password);


        let query = "INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES ($1,$2,$3,$4, NOW(), NOW())";
        db.none(query, [first_name, last_name, email, password]);
    }

    findUser(req, res) {
        let email = req.body.email;

        let query = "SELECT * FROM users WHERE email = $1";
        let result = db.result(query, email, r => r.rows)
            .then(data => {
                return data;
            })
            .catch((error) => console.log(error));
        return result;
    }

}

let user = new User();

module.exports = user;