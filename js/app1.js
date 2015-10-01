// JavaScript source code
var app = angular.module("app", ['ngRoute', 'ngSanitize', 'ngCsv', 'angularFileUpload', 'ui.bootstrap', 'ngMessages','angularUtils.directives.dirPagination']);

app.config(function ($routeProvider) {

    $routeProvider
    .when('/', {controller: 'listController', templateUrl: 'partials/list.html'})
    .when('/upload', {controller: 'uploadFilesCtrl', templateUrl: 'partials/uploadFiles.html'})
    .when('/upload1', {controller: 'uploadFiles1Ctrl', templateUrl: 'partials/uploadFiles1.html'})
    .otherwise({ redirectTo: '/' });

});

app.factory("userService", ['$http', '$q', function ($http, $q) {

    var svc = {};

    var rootUrl = 'http://localhost:8080/cgi-bin/cgiip.exe/WService=wsbroker1/adz/';

    svc.data = [];

    svc.getData = function (callObj,service,params) {
        var x2js = new X2JS();

        $http.get(rootUrl + service + params).then(
            function (data) {
                svc.data = x2js.xml_str2json(data.data);
                svc.data = svc.data.dsWebService;
                callObj(svc.data);
            },
            function (error) {
            }

        );
    }

    svc.getUsers = function (service, params) {
        var x2js = new X2JS();
        var defer = $q.defer();

        $http.get(rootUrl + service + params).then(
            function (data) {
                svc.data = x2js.xml_str2json(data.data);
                svc.data = svc.data.dsWebService;
                defer.resolve(svc.data);
            },
            function (error) {
                defer.reject(error);
            }

        );
        return defer.promise;
    }

    svc.setData = function(callObj,service,object){
      var x2js = new X2JS();
      console.log(object);
      var string = x2js.json2xml_str(object);
      console.log(string);
      $http.post(rootUrl + service, string).then(
        function(data){
           svc.data = x2js.xml_str2json(data.data);
           svc.data = svc.data.dsWebService;
           callObj(svc.data);
        },
        function(error){
        }
      )
    }

    return svc;
}]);

app.controller("listController", ['$scope', '$location', '$routeParams', 'userService', function ($scope, $location, $routeParams, userService) {

    var service = 'user.p?serviceName=getUserlist';
    var params  = '';

    callObj = function (data) {
        $scope.users = data.ttBenutzer;
        $scope.teams = data.ttTeam;
    }

    $scope.users = [];
    $scope.searchUsers = function () {
        params = '&searchUser=' + $scope.search;

        userService.getData(callObj, service, params);

    }

    $scope.searchUsers1 = function () {
        params = '&searchUser=' + $scope.search;
        userService.getUsers(service, params).then(
            function (data) {
                $scope.users = data.ttBenutzer;
            },
            function (error) {
            }
        );
    }

    $scope.showDetail = function(index){
      $scope.user = $scope.users[index];
    }

    $scope.getCsv = function () {

        csv = [];
        for (i = 0; i < $scope.users.length; ++i) {
            csv.push({a: $scope.users[i].Nachname, b: $scope.users[i].Vorname});
        }

        return csv;
    }

}]);

app.directive('helloWorld', function () {
    return {
        restrict: 'AE',
        template: '<p ng-transclude style="background-color:{{color}}">Hello {{name}}',
        scope: {
            color: '@colorAttr'
        },
        transclude: true,
        link: function (scope, element, attrs) {
            element[0].onclick = function () { element[0].style.color = 'red';}
        }

    }
})

app.directive('myDirective', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            // add a parser that will process each time the value is
            // parsed into the model when the user updates it.

            ctrl.$parsers.unshift(function (value) {
                alert(value);
                if (value) {
                    // test and set the validity after update.
                    var valid = value.charAt(0) == 'A' || value.charAt(0) == 'a';
                    ctrl.$setValidity('invalidAiportCode', valid);
                }

                // if it's valid, return the value to the model,
                // otherwise return undefined.
                return valid ? value : undefined;
            });


        }

    }
}

)

app.directive('showErrors', function() {
    return {
      restrict: 'A',
      require:  '^form',
      link: function (scope, el, attrs, formCtrl) {
        // find the text box element, which has the 'name' attribute
        var inputEl   = el[0].querySelector("[name]");

        // convert the native text box element to an angular element
        var inputNgEl = 1§lar.element(inputEl);
        // get the name on the text box so we know the property to check
        // on the form controller
        var inputName = inputNgEl.attr('name');

        // only apply the has-error class after the user leaves the text box
        inputNgEl.bind('blur', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        })
      }
    }
});

app.controller("searchCtrl", function () {
    this.submitSearch = function () {
        console.log(this.searchForm);

        if (this.searchForm.$valid) {
            console.log("form sent");
        } else {
            // If for, is invalid, show errors
            this.searchForm.submitted = true;
        }

    }

});
