/**
 * Created by vinhta on 13/01/2016.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var appConfig = require('./appConfig');
var multer = require('multer');

var baseUrl = '/' + appConfig.apiVersion;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Security filter
var authenticateHeader = function (req, res, next) {
    next();
};

app.use(baseUrl + '/mission', [authenticateHeader], routes.mission);

app.use(baseUrl + '/rover', [authenticateHeader], routes.rover);

module.exports = app;

