(function() {
  var app = angular.module('karma-helper', []);

  app.controller('KarmaHelperController', ['$http', function($http){
    var sub = pcmasterrace;
    this.getData(){
      $http.get('https://karma-helper.herokuapp.com/' + sub + '.json').success(function(data){
        returned = data;
      });
      
    }
  }]);
})();
