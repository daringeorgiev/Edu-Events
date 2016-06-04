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
            eventName: req.body.eventName
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
                    // ToDo set Event

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
        Event.findById(req.body._id, function(err, event) {
            if (err) {
                throw err;
            }

            if (event.ownerId && (res.req.decoded && event.ownerId !== res.req.decoded._id || !res.req.decoded)) {
                return res.status(403)
                    .send('You are not authorized to update this event');
            }
            // ToDo set Event

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
