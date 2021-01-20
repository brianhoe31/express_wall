var express = require('express');
var messageModel = require('../models/message');

class Main {
    loadIndex(req, res){
        res.render('index');
    }   

    loadWall(req, res){
        messageModel.getAllMessages(req, res)
            .then(data =>{
                res.render('wall', {messages: data});
            })
        
    }   
}

let main = new Main;

module.exports = main;