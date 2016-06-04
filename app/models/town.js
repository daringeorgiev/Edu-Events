var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var townSchema = Schema({
    name: {
        type: 'String',
        unique: true,
        required: true
    },
});

module.exports = mongoose.model('Town', townSchema);
