var usersCtrl = require('./controllers/UsersController'),
    eventsCtrl = require('./controllers/EventsController'),
    auth = require('./auth');

module.exports = function (app) {
    'use strict';
    //Users =================================================
    app.post('/api/login', usersCtrl.userLogin);
    app.post('/api/register', usersCtrl.userRegister);

    //Events =================================================
    app.get('/api/events', auth.isLoggedIn, eventsCtrl.getAllEvents);
    app.get('/api/events/:id', eventsCtrl.getEventById);
    app.post('/api/events', auth.isLoggedIn, eventsCtrl.createEvent);
    app.put('/api/events/:id', auth.isLoggedIn, eventsCtrl.updateEvent);
    app.delete('/api/events/:id', auth.isLoggedIn, eventsCtrl.deleteEvent);

    //Index =================================================
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
