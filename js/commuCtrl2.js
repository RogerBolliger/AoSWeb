angular.module('commuCtrl2',[])

  .controller('commuCtrl2', ['$scope', 'commuService', '$element', function ($scope, commuService, $element) {

    $scope.$watch(function($scope){
      return this.ctrl2Input;
    },
    function (newValue,oldValue){
      console.log(newValue);
    });

    $scope.$on('newMessage', function(event,message){
      this.ctrl2Input = message ;
      document.querySelector("[id]").style.backgroundColor = 'green';
      angular.element(document.querySelector("[id]"))[0].style.color = 'white';
      //erstes
      console.log(angular.element(document.querySelector("[id]")));
      console.log($element.find('[id]'));
      var element = $element.find('[id]');
      element.style = {color: "red"};
    });
    // Ist nur bei initialisierung des Controllers zu gebrauchen
    if (commuService.getMessage('message') === '') {
      this.ctrl2Input = 'no initial message passed by controller1';

    }
    else this.ctrl2Input = commuService.getMessage('message');

    console.log($("label"));
    label = angular.element(document.querySelectorAll("label"))['0'];
    angular.element(label).bind('click', function(){
      alert('Hallo Roger');
      //angular.element(label).attr('color') = 'red';
      }
    );

    label.style.color = 'red';
  }])

.directive('ctrl', function(){

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope,elem,attrs,ngModel){
      console.log(ngModel);

      scope.$watch(function(scope){
        return scope.ctrl2;
      },function(newValue,oldValue){
        console.log(newValue+'/'+oldValue);
      })

      var colorList = ['','blue','yellow','green','red','black','pink'];

      elem.bind('click',function(){
        elem[0].style.color = attrs.color;
      })

      function watchInput(viewValue){
         elem[0].style.color = colorList[viewValue.length];
      }

      ngModel.$parsers.push(watchInput);

      //console.log(elem[0].html());

    }


  }

})