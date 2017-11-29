var phonecatApp = angular.module('phonecatApp', []);

var FilePath = "/Patterns";
var patternLimit = 12;


phonecatApp.controller('ServiceController', function ServiceController($scope, $http, $q) {
  $scope.patterns = [];
  $scope.limit = 5;
  $scope.checked = 0;

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
      console.log ($scope.patterns);
    })

  }

  $scope.checkChanged = function(i){
    console.log (i);
    if($scope.patterns[i].selected) 
        $scope.checked++;
    else 
      $scope.checked--;
    console.log ($scope.checked);
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

    console.log (data);

  //  $http.post (FilePath+ "/final.txt", data);

  var blob = new Blob([data], {type: 'text/plain'}),
           e    = document.createEvent('MouseEvents'),
           a    = document.createElement('a')
// FOR IE:

 if (window.navigator && window.navigator.msSaveOrOpenBlob) {
     window.navigator.msSaveOrOpenBlob(blob, FilePath+ "/final.txt");
 }
 else{
     var e = document.createEvent('MouseEvents'),
         a = document.createElement('a');

     a.download = FilePath+ "/final.txt";
     a.href = window.URL.createObjectURL(blob);
     a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
     e.initEvent('click', true, false, window,
         0, 0, 0, 0, 0, false, false, false, false, 0, null);
     a.dispatchEvent(e);
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
