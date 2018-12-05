
'use strict';

// Enter listener
angular.module('searchVizApp')
  .directive('onEnter', function() {
    return function(scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$eval(attrs.onEnter);
        }
      });
    };
  });
