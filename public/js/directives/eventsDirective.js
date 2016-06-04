app.directive('event', function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: '../partials/event-item.html',
        scope:{
            event: '=eventData'
        }
    };
});