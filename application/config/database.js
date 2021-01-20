var pgp = require('pg-promise')(/* options */)
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'wall',
    user: 'bhuo',
    password: 'asdf',
    max: 30 // use up to 30 connections
};
var db = pgp(cn);
//separate file & require db 

module.exports = db;