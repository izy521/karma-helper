var helper = angular.module('helper', ['chart.js']);

helper.controller('HelperController', ['$http', '$scope', function($http, $scope) {
  $scope.subreddit;
  $scope.data = [];
  $scope.bestTime = 0;
  $scope.bestScore = 0;
  $scope.gotDataYet = false;
  $scope.error = false;
  $scope.status = 0;

  $scope.getResults = function() {
    $http.get('https://karma-helper.herokuapp.com/' + $scope.subreddit + '.json').success(function(data){
        if(data.error) {
          $scope.error = true;
          $scope.gotDataYet = false;
          $scope.status = data.error;
        }
        else {
          $scope.data = data.result;
          $scope.bestTime = data.best;
          $scope.bestScore = data.bestScore;
          
          $scope.gotDataYet = true;
          $scope.error = false;
          $scope.status = 200;
        }
      });
    }
}]);
