var Event = require('../models/event');

module.exports = {
    getAllEvents: function(req, res) {
        Event.find({}, function(err, events) {
            if (err) {
                throw err;
            }
            res.json(events);
        });
    },

    getEventById: function (req, res) {
        Event.findOne({_id: req.params.id}, function (err, event) {
            if (err) {
                res.status(404)
                    .json(err.message);
            }
            res.json(event);
        });
    },

    createEvent: function(req, res) {
        Event.find({
            name: req.body.name
        }, function(err, data) {
            if (err) {
                res.send(err);
                throw err;
            }
            if (data.length) {
                return res.status(409)
                    .send('The event already exist. You should change the name.');
            } else {
                Event.create({
                    name: req.body.name,
                    ownerId: req.body.ownerId,
                    town: req.body.town,
                    school: req.body.school,
                    address: req.body.address,
                    grade: req.body.grade,
                    subject: req.body.subject,
                    date: req.body.date,
                    email: req.body.email,
                    phone: req.body.phone ? req.body.phone : '',
                    descr: req.body.descr ? req.body.descr : '',
                    link: req.body.link ? req.body.link : ''
                }, function(err, event) {
                    if (err) {
                        res.send(err);
                        throw err;
                    }
                    res.send(event);
                });
            }
        });
    },

    updateEvent: function(req, res) {
        Event.findById(req.params.id, function(err, event) {
            if (err) {
                throw err;
            }

            if (!event) {
                return res.status(404)
                    .send('Event not found');
            }

            if (event.ownerId && (res.req.decoded && event.ownerId !== res.req.decoded._id || !res.req.decoded)) {
                return res.status(403)
                    .send('You are not authorized to update this event');
            }

            event.name = req.body.name;
            event.ownerId = req.body.ownerId;
            event.town = req.body.town;
            event.school = req.body.school;
            event.address = req.body.address;
            event.grade = req.body.grade;
            event.subject = req.body.subject;
            event.date = req.body.date;
            event.email = req.body.email;
            event.phone = req.body.phone ? req.body.phone : '';
            event.descr = req.body.descr ? req.body.descr : '';
            event.link = req.body.link ? req.body.link : '';

            event.save(function(err, event) {
                if (err) {
                    res.send(err);
                }
                res.json(event);
            });
        });
    },

    deleteEvent: function(req, res) {
        if (req.decoded) {
            Event.findOne({
                _id: req.params.id
            }, function(err, event) {
                if (err) {
                    res.status(404)
                        .json(err.message);
                }

                if (req.decoded._id === event.ownerId || req.decoded.admin) {
                    Event.remove({
                        _id: req.params.id
                    }, function(err, event) {
                        if (err) {
                            res.send(err);
                            throw err;
                        }
                        Event.find({}, function(err, events) {
                            if (err) {
                                throw err;
                            }
                            res.json(events);
                        });
                    });
                } else {
                    return res.status(403)
                        .send('You are not authorized to delete this event');
                }
            });
        } else {
            return res.status(401)
                .send('You are not authenticated');
        }
    }
};
