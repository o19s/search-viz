'use strict';

/**
 * @ngdoc function
 * @name searchVizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchVizApp
 */
angular.module('searchVizApp')
  .service('solr', ['$q', '$http', function ($q, $http) {
    var factory = {};

    var SOLR_EP = 'http://solr.quepid.com/solr/tmdb/select?';

    factory.search = function(query) {
      var deferred = $q.defer();

      var qf = "title cast tagline overview directors";

      var params = {
        'defType': 'edismax',
        'facet': 'true',
        'facet.field': 'genres',
        'facet.limit': 5,
        'facet.mincount': 1,
        'json.nl': 'map',
        'q': query,
        'qf': qf,
        'rows': 25,
        'wt': 'json'
      };

      $http.get(SOLR_EP, {params: params})
        .then(function(data) {
          deferred.resolve(data.data);
        }, function() {
          deferred.reject();
        });

      return deferred.promise;
    };

    return factory;
  }]);
