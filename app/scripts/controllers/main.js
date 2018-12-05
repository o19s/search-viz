'use strict';

/**
 * @ngdoc function
 * @name searchVizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchVizApp
 */
angular.module('searchVizApp')
  .controller('MainCtrl', ['$scope', 'solr', function ($scope, solr) {
    $scope.docs = [];

    $scope.submitSearch = function() {
      var query = $scope.queryText;

      solr.search(query).then(
        function(data) {
          $scope.docs = data['response']['docs'];
        },
        function() {
          // Don't care for this app
        });
    };
    
  }]);
