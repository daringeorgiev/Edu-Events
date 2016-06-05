var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var eventSchema = Schema({
    name: {
        type: 'String',
        unique: true,
        index: true,
        required: true
    },
    ownerId: {
        type: 'String',
        required: true
    },
    town: {
        type: 'String',
        required: true
    },
    school: {
        type: 'String',
        required: true
    },
    address: {
        type: 'String',
        required: true
    },
    grade: {
        type: 'String',
        required: true
    },
    subject: {
        type: 'String',
        required: true
    },
    date: {
        type: 'Date',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    phone: String,
    descr: String,
    link: String
});

module.exports = mongoose.model('Event', eventSchema);
