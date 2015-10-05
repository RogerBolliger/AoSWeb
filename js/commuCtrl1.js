angular.module('commuCtrl1',[])

  .controller('commuCtrl1', ['$scope', 'commuService', function ($scope, commuService) {

     var message = 'initial message passed by controller1';
     commuService.setMessage('message', message);

     $scope.$watch('ctrl1Input',function(newValue,oldValue){
       if (newValue == 'roger') {
         console.log(newValue);
         commuService.setMessage('message', newValue);
       }
     });
  }])
