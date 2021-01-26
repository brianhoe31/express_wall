var express = require('express');
var messageModel = require('../models/message');
var output = require('../config/output');

class Main {
    loadIndex(req, res) {
        
        res.render('index');
    }

    async loadWall(req, res) {
        let sqlData = [];
        
        try{
            let messages = await messageModel.getAllMessages(req, res)
            sqlData.push({ messages: messages });
    
            let comments = await messageModel.getAllComments(req, res)
            sqlData.push({ comments: comments });
        }catch (e) {
            console.log(e);
        }

        output.enable_profiler(req, res);
        
        res.render('wall', { data: sqlData });
    }
}

let main = new Main;

module.exports = main;