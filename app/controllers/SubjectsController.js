var Subject = require('../models/subject');

module.exports = {
    getAllSubjects: function(req, res) {
        Subject.find({}, function(err, subjects) {
            if (err) {
                throw err;
            }
            res.json(subjects);
        });
    },
};
