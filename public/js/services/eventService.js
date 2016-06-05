(function() {
    'use strict';
    app.factory('eventService', ['$http', '$window', function($http, $window) {
        var self = this;
        self.allEvents = [];
        self.selectedEvent = {};

        function getAllEvents() {
            return $http.get('/api/events');
        }

        function getMyEvents() {
            var req = {
                method: 'GET',
                url: '/api/events?ownerId=' + $window.localStorage._id,
                headers: {
                    'x-access-token': $window.localStorage.token
                }
            };

            return $http(req);
        }

        function getEventById(id) {
            return $http.get('/api/events/' + id);
        }

        function createEvent(event) {
            var req = event;
            req.ownerId = $window.localStorage._id
            req.token = $window.localStorage.token;
            return $http.post('/api/events', req);
        }

        function deleteEvent(id) {
            var req = {
                method: 'DELETE',
                url: '/api/events/' + id,
                headers: {
                    'x-access-token': $window.localStorage.token
                }
            };
            return $http(req);
        }

        function updateEvent(event) {
            var req = event;
            req.token = $window.localStorage.token;
            return $http.put('/api/events/' + event._id, req);
        }

        function setStoredEvents(data) {
            self.allEvents.length = 0;
            data.forEach(function(event) {
                self.allEvents.push(event);
            });
        }

        function getStoredEvents() {
            return self.allEvents;
        }

        function setSelectedEvent(data) {
            // ToDo set properies
        }

        function getSelectedEvent() {
            return self.selectedEvent;
        }

        function getTowns() {
            return $http.get('/api/towns');
        }

        function getSubjects() {
            return $http.get('/api/subjects');
        }

        function filterEvents(keyword, town, subject) {
            return $http.get('/api/events?keyword=' + keyword + '&town=' + town + '&subject=' + subject);
        }

        return {
            getAllEvents: getAllEvents,
            getMyEvents: getMyEvents,
            getEventById: getEventById,
            createEvent: createEvent,
            deleteEvent: deleteEvent,
            updateEvent: updateEvent,
            setStoredEvents: setStoredEvents,
            getStoredEvents: getStoredEvents,
            getSelectedEvent: getSelectedEvent,
            setSelectedEvent: setSelectedEvent,
            getTowns: getTowns,
            getSubjects: getSubjects,
            filterEvents: filterEvents
        };
    }]);
}());
