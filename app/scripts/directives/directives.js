
'use strict';

// Enter listener
angular.module('searchVizApp')
  .directive('onEnter', function() {
    return function(scope, element, attrs) {
      element.bind('keyup', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.onEnter);
          });

          event.preventDefault();
        }
      });
    };
  });
