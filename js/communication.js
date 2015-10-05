angular.module('myApp', ['commuCtrl1','commuCtrl2'])

  // für die Kommunikation zwischen den Controllern
  .factory('commuService', function($rootScope){
    var srv = {};

    srv.setMessage = function(attr,value){
      srv.obj = {message: ''};
      srv.obj[attr] = value;
      $rootScope.$broadcast('newMessage',srv.getMessage('message'));
      console.log(srv.obj);
    }
    srv.getMessage = function(attr){
      return srv.obj[attr];
    }

    return srv;
  })

/**************
<div ng-controller='MyCtrl'>
    <div>
        <div name='foo' class='myElementClass'>this one</div>
    </div>
</div>
This AngularJS code should work:

angular.module('MyClient').controller('MyCtrl', [
    '$scope',
    '$element',
    '$log',
    function ($scope, $element, $log) {

        // Find the element by its class attribute, within your controller's scope
        var myElements = $element.find('.myElementClass');

        // myElements is now an array of jQuery DOM elements

        if (myElements.length == 0) {
            // Not found. Are you sure you've included the full jQuery?
        } else {
            // There should only be one, and it will be element 0
            $log.debug(myElements[0].name); // "foo"
        }

    }
]);
**************/
