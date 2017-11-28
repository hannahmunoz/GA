var phonecatApp = angular.module('phonecatApp', []);

var FilePath = "/Patterns";
var patternLimit = 3;

var patterns = [];

phonecatApp.controller('ServiceController', function ServiceController($scope, $http, $q) {
  var init = function(){
      $q (function(success, failure){
          for (var i = 0; i < patternLimit; i++ ){
            FileRead(i).then (function(response){
              console.log (response);
              if (response == patternLimit-1){
                success(response);
              }
            })
          }  
      }).then (function success(response){ 
      console.log (patterns);
      console.log (patterns.length);
      console.log (patterns[1]);
    })

  }

   function FileRead(iter){
    return $http.get(FilePath+ '/'+iter+'.txt').then(function(data) {
           patterns.push (data.data);
           return iter;
    });
  }

  init();
});