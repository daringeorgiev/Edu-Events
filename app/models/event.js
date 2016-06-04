var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var eventSchema = Schema({
    eventName: {
        type: 'String',
        unique: true,
        index: true
    },
    ownerId: {
        type: 'String',
        unique: true,
    },
    school: {
        type: 'String',
        unique: true,
    },
    address: {
        type: 'String',
        unique: true,
    },
    grade: {
        type: 'String',
        unique: true,
    },
    subject: {
        type: 'String',
        unique: true,
    },
    date: {
        type: 'Date',
        unique: true,
    },
    eMail: {
        type: 'String',
        unique: true,
    },
    link: String
});

module.exports = mongoose.model('Event', eventSchema);
