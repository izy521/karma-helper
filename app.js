// Define the `phonecatApp` module
var helper = angular.module('helper', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
helper.controller('HelperController', ['$http', '$scope', function($http, $scope) {
  $scope.subreddit = "pcmasterrace";
  $scope.results = [];
  $scope.bestTime = 0;
  $scope.bestScore = 0;
  $http.get('https://karma-helper.herokuapp.com/' + $scope.subreddit + '.json').success(function(data){
    $scope.results = data.result;
    $scope.bestTime = data.best;
    $scope.bestScore = data.bestScore;
  });
}]);
