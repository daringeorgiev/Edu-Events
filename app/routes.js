var usersCtrl = require('./controllers/UsersController'),
    eventsCtrl = require('./controllers/EventsController'),
    townsCtrl = require('./controllers/TownsController'),
    subjectsCtrl = require('./controllers/SubjectsController'),
    auth = require('./auth');

module.exports = function (app) {
    'use strict';
    //Users =================================================
    app.post('/api/login', usersCtrl.userLogin);
    app.post('/api/register', usersCtrl.userRegister);

    //Events =================================================
    app.get('/api/events', eventsCtrl.getAllEvents);
    app.get('/api/events/:id', eventsCtrl.getEventById);
    app.post('/api/events', auth.isLoggedIn, eventsCtrl.createEvent);
    app.put('/api/events/:id', auth.isLoggedIn, eventsCtrl.updateEvent);
    app.delete('/api/events/:id', auth.isLoggedIn, eventsCtrl.deleteEvent);

    //Towns ==================================================
    app.get('/api/towns', townsCtrl.getAllTowns);

    //Subjects ===============================================
    app.get('/api/subjects', subjectsCtrl.getAllSubjects);

    //Index =================================================
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
