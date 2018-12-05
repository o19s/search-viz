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

    $scope.genreBar = {};

    $scope.submitSearch = function() {
      var query = $scope.queryText;

      solr.search(query).then(
        function(data) {
          $scope.docs = data['response']['docs'];

          $scope.setupGenreBars(data);
        },
        function() {
          // Don't care for this app
        });
    };
    

    // Genre bar graph setup
    $scope.setupGenreBars = function(data) {
      $scope.genreBar.labels = [];
      $scope.genreBar.data = [];

      // Graphs in chartjs need data/series/labels
      angular.forEach(data['facet_counts']['facet_fields']['genres'], function(count, genre) {
        $scope.genreBar.labels.push(genre);
        $scope.genreBar.data.push(count);
      });
    };
  }]);
