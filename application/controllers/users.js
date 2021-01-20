var md5 = require('md5');
var userModel = require('../models/user');

class Users {
    loadLogin(req, res) {
        let errors = [];
        res.render('login', {errors: errors});
    }

    loadRegister(req, res){
        let errors = [];
        res.render('register', {errors: errors});
    }

    register(req, res) {
        let errors = userModel.validateRegistration(req, res);

        if(errors.length > 0){
            res.render("register", {errors: errors});
        }else {
            userModel.createUser(req, res);
            let success = 'successfully logged in';
            
            userModel.findUser(req, res).then(data =>{
                req.session.userId = data[0].id;
                console.log(req.session);
                res.redirect('/wall');
            })
        }
    }

    login(req, res) {
        let errors = userModel.validateLogin(req, res);

        if(errors.length > 0){
            res.render("login", {errors:errors});
        }else{
            //check if login credentials match any in DB
            userModel.findUser(req, res).then(data => {
                if(data.length == 0 || data[0].password !== md5(req.body.password)){
                    errors = ['Username or Password incorrect'];
                    res.render("login", {errors:errors})
                }else{
                    req.session.userId = data[0].id;
                    console.log('LOGGED IN. SESSION IS : ', req.session);
                    res.redirect("/wall");
                }
            });
        }
    }

    logout(req, res){
        req.session.destroy(function(err){
            let errors = [];
            res.render("login", {errors:errors});
        })
    }
}

let users = new Users;

module.exports = users;