var express = require('express');
var messageModel = require('../models/message');
var output = require('../config/output');

class Main {
    loadIndex(req, res) {
        let profile = output.enable_profiler(req, res);
        res.render('index', {profile:profile});
    }

    loadWall(req, res) {
        output.enable_profiler(req, res);
        let sqlData = [];
        messageModel.getAllMessages(req, res)
            .then(data => {
                sqlData.push({ messages: data });
                messageModel.getAllComments(req, res)
                    .then(data => {
                        sqlData.push({ comments: data });
                        res.render('wall', { data: sqlData });
                    })
            })
    }//refactor with async & await 
}

let main = new Main;

module.exports = main;