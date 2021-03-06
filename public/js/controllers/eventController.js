(function() {
    'use strict';
    app.controller('EventController', ['$scope', '$rootScope', '$route','$routeParams', '$location', 'eventService', 'userService',
        function ($scope, $rootScope, $route, $routeParams, $location, eventService, userService) {
        var self = this;

        self.user = userService.getUser();
        self.allEvents = eventService.getStoredEvents();

        self.keyword = '';
        self.selectedTown = {};
        self.selectedSubject = {};
        self.event = {
            name: '',
            ownerId: '',
            town: '',
            school: '',
            address: '',
            grade: '',
            subject: '',
            date: '',
            email: '',
            phone: '',
            descr: '',
            link: ''
        };

        self.getTowns = function() {
            eventService.getTowns()
                .then(function successCallback(res) {
                    self.towns = res.data;
                }, function errorCallback(res) {
                    console.log('Error: ' + JSON.stringify(res.data));
                });
        }();

        self.getSubjects = function() {
            eventService.getSubjects()
                .then(function successCallback(res) {
                    self.subjects = res.data;
                }, function errorCallback(res) {
                    console.log('Error: ' + JSON.stringify(res.data));
                });
        }();

        self.getAllEvents = function() {
            eventService.getAllEvents()
                .then(function successCallback(res) {
                    eventService.setStoredEvents(res.data);
                    self.selectedEventGetterSetter('');
                }, function errorCallback(res) {
                    self.selectedEventGetterSetter('');
                    console.log('Error: ' + JSON.stringify(res.data));
                });
        }();

        self.filterEvents = function() {
            eventService.filterEvents(self.keyword, self.selectedTown, self.selectedSubject)
                .then(function successCallback(res) {
                    eventService.setStoredEvents(res.data);
                    self.selectedEventGetterSetter('');
                }, function errorCallback(res) {
                    self.selectedEventGetterSetter('');
                    console.log('Error: ' + JSON.stringify(res.data));
                });
            console.log('search by ' + self.keyword + ' ' + self.selectedTown + ' ' + self.selectedSubject);
        };

        self.getMyEvents = function() {
            eventService.getMyEvents()
                .then(function successCallback(res) {
                    eventService.setStoredEvents(res.data);
                    self.selectedEventGetterSetter('');
                }, function errorCallback(res) {
                    self.selectedEventGetterSetter('');
                    console.log('Error: ' + JSON.stringify(res.data));
                });
        };

        self.createNewEvent = function () {
            eventService.createEvent(self.event)
                .then(function successCallback(res) {
                    eventService.setSelectedEvent(res.data);
                    self.isSaveAsEventVisible = false;
                    self.allEvents.push(res.data);
                    //self.changeEventColors();
                    $location.path('/');
                    //$location.search('id', self.selectedEvent._id);
                }, function errorCallback(res) {
                    console.log("Error: " + res.data);
                });
        };

        self.updateEvent = function () {
            eventService.updateEvent(self.selectedEvent)
                .then(function successCallback(res) {
                    eventService.setSelectedEvent(res.data);
                    //self.changeEventColors();
                    self.isEditEventVisible = false;
                    $location.path('/');
                    //$location.search('id', self.selectedEvent._id);
                }, function errorCallback(res) {
                    console.log("Error: " + res.data);
                });
        };

        self.deleteEvent = function () {
            if (confirm('Are you sure you want to delete ' + self.selectedEvent.eventName + ' event?')) {
                eventService.deleteEvent(self.selectedEvent._id)
                    .then(function successCallback(res) {
                        eventService.setStoredEvents(res.data);
                        if (self.allEvents) {
                            eventService.selectDefaultEvent();
                        }
                        $location.path('/');
                        self.selectedEventGetterSetter('');
                    }, function errorCallback(res) {
                        console.log("Error: " + res.data);
                    });
            }
        };

        self.setEventById = function (id) {
            eventService.getEventById(id)
                .then(function successCallback(res) {
                    eventService.setSelectedEvent(res.data);
                    //self.changeEventColors();
                }, function errorCallback(res) {
                    console.log("Error: " + res.data);
                });
        };

        // self.changeSelectedEvent = function(event) {
        //     eventService.setSelectedEvent(event);
        //     $location.search('id', self.selectedEvent._id);
        // };

        self.selectedEventGetterSetter = function(newInputValue) {
            if (arguments.length) {
                self.selectEventInputValue = newInputValue || '';
            }
            return self.selectEventInputValue;
        };

        // Set selected event id as URL parameter
        // $rootScope.$on('$routeChangeStart', function(next, last) {
        //     if ($location.path() === '/' && self.selectedEvent._id) {
        //         $location.search('id', self.selectedEvent._id);
        //     }
        // });
    }]);
}());
