var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var subjectSchema = Schema({
    name: {
        type: 'String',
        unique: true,
        required: true
    },
});

module.exports = mongoose.model('Subject', subjectSchema);
