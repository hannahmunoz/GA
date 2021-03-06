var phonecatApp = angular.module('phonecatApp', []);

var FilePath = "/Patterns";
var patternLimit = 9;

phonecatApp.controller('ServiceController', function ServiceController($scope, $http, $q, $timeout) {
  $scope.patterns = [];
  $scope.limit = 5;
  $scope.checked = 0;
  $scope.colorScheme = "Batman"
  var init = function(){
    $q (function(success, failure){
      for (var i = 0; i < patternLimit; i++ ){
        FileRead(i).then (function(response){
          if (response == patternLimit-1){
            success($scope.response);
          }
        })
      }
    }).then (function success(response){
      console.log ("Pattern Read in: ",$scope.patterns);
    })

  }

  $scope.checkChanged = function(i){
    if($scope.patterns[i].selected) 
        $scope.checked++;
    else 
      $scope.checked--;
  }

  $scope.next = function(){
    data=[];
    for (var i = 0; i < patternLimit; i++ ){
        if ($scope.patterns[i].selected){
          data.push ("1");
        }
        else{
          data.push ("0");
        }
    }

    console.log ("Selection Output:", data);
    var blob = new Blob([data], {type: 'text/plain'});
        // FOR IE:
         if (window.navigator && window.navigator.msSaveOrOpenBlob) {
             window.navigator.msSaveOrOpenBlob(blob, "result.txt");
         }
         else{
             e = document.createEvent('MouseEvents'),
             a  = document.createElement('a')

             a.download = "result.txt";
             a.target = "_self" 
             a.href = window.URL.createObjectURL(blob);
             a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
             e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
             a.dispatchEvent(e);
         }
      $timeout(reset, 2000);
  }

  function reset(){
    $scope.patterns = [];
    $scope.checked = 0;
    init();
  }

  $scope.getStyle = function (char){
    if ($scope.colorScheme == "Batman"){
     if (char == 0){
           $scope.color = "/CSS/black.png"
        }
        else if (char == 1){
          $scope.color = "/CSS/red.png"
        }
        else if (char == 2){
          $scope.color = "/CSS/yellow.png"
        }
        else if (char == 3){
          $scope.color = "/CSS/green.png"
        }
        else if (char == 4){
          $scope.color = "/CSS/white.png"
        }
        else{
          $scope.color = char;
        }
    }

    else if ($scope.colorScheme == "Flash"){
     if (char == 0){
           $scope.color = "/CSS/red.png"
        }
        else if (char == 1){
          $scope.color = "/CSS/yellow.png"
        }
        else if (char == 2){
          $scope.color = "/CSS/white.png"
        }
        else{
          $scope.color = char;
        }
    }

    else if ($scope.colorScheme == "GreenLantern"){
       if (char == 0){
             $scope.color = "/CSS/green.png"
          }
          else if (char == 1){
            $scope.color = "/CSS/white.png"
          }
        else if (char == 2){
          $scope.color = "/CSS/black.png"
        }
          else{
            $scope.color = char;
          }
    }


  }

  $scope.finished = function(){
  }

   function FileRead(iter){
    return $http.get(FilePath+ '/'+iter+'.txt').then(function(data) {
      $scope.patterns.push ({data: data.data, selected: false});
      return iter;
    });
  }

  init();
});
