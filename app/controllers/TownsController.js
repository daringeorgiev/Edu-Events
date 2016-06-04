var Town = require('../models/town');

module.exports = {
    getAllTowns: function(req, res) {
        Town.find({}, function(err, towns) {
            if (err) {
                throw err;
            }
            res.json(towns);
        });
    },
};
