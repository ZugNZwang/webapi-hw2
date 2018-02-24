// Eric Holguin
// CSCI 3916: WEBAPI
// Homework 2

require('dotenv').config();
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');

var app = express();

var uniqueKey = process.env.UNIQUE_KEY;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

// Route /gets accepts get method
router.route('/gets').get(function (req, res) {

    var getInfo = {query: req.query, headers: req.headers, unique_key: uniqueKey}

    if(Object.keys(req.query).length === 0)
    {
        res.status(400).send("No query");
    }
    if(Object.keys(req.headers).length === 0)
    {
        res.status(400).send("No headers");
    }
    else
    {
        res.status(200).send(getInfo);
    }

});

// Route /posts accepts get method
router.route('/posts').post(function (req, res) {

    var postInfo = {query: req.query, headers: req.headers, unique_key: uniqueKey}

    if(Object.keys(req.query).length === 0)
    {
        res.status(400).send("No query");
    }
    if(Object.keys(req.headers).length === 0)
    {
        res.status(400).send("No headers");
    }
    else
    {
        res.status(200).send(postInfo);
    }

});


// Route /puts accepts get method
router.route('/puts').put(function (req, res) {

    var putInfo = {query: req.query, headers: req.headers, unique_key: uniqueKey}

    if(Object.keys(req.query).length === 0)
    {
        res.status(400).send("No query");
    }
    if(Object.keys(req.headers).length === 0)
    {
        res.status(400).send("No headers");
    }
    else
    {
        res.status(200).send(putInfo);
    }

});

// Route /deletes accepts get method
router.route('/deletes')
    .delete(authController.isAuthenticated, function (req, res) {

    var delInfo = {query: req.query, headers: req.headers, unique_key: uniqueKey}

    if(Object.keys(req.query).length === 0)
    {
        res.status(400).send("No query");
    }
    if(Object.keys(req.headers).length === 0)
    {
        res.status(400).send("No headers");
    }
    else
    {
        res.status(200).send(delInfo);
    }

});

app.use('/', router);
app.listen(process.env.PORT || 8080);