module.exports = {
    'url': process.env.DATABASE_URL || 'mongodb://localhost/edu_events'
};

//Create towns
var Town = require('../app/models/town'),
    townsArray = ['София', 'Монтана', 'Варна'];

Town.find({}, function(err, towns) {
    if (err) {
        throw err;
    }
    if (towns.length === 0) {
        townsArray.forEach(function(town) {
            Town.create({
                name: town,

            }, function(err, town) {
                if (err) {
                    throw err;
                }
                console.log("Towns " + town + " created");
            });
        })
    }
});

//Create subjects
var Subject = require('../app/models/subject'),
    subjectsArray = ['Математика', 'Информатика', 'История'];

Subject.find({}, function(err, subjects) {
    if (err) {
        throw err;
    }
    if (subjects.length === 0) {
        subjectsArray.forEach(function(subject) {
            Subject.create({
                name: subject,

            }, function(err, subject) {
                if (err) {
                    throw err;
                }
                console.log("Subjects " + subject + " created");
            });
        })
    }
});
