'use strict';
// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var database = require('./config/database');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration =================
app.set('port', (process.env.PORT || 5000));
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());

// routes =============================
require('./app/routes')(app);

// listen ======================================
app.listen(app.get('port'), function() {
    console.log('Edu Events app is running on port', app.get('port'));
});
