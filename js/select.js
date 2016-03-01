var app = angular.module('Demo', ['AxelSoft','ui.bootstrap']);

app.controller('DemoController', ['$scope', '$timeout', '$q', '$http', function ($scope, $timeout, $q, $http) {

  $scope.dynamicPopover = {content: 'Hello, World!', templateUrl: 'myPopoverTemplate.html', title: 'Title' };

  console.log($("#div0") );

  /*********** jQuery Animation *******************/
  /*
  $("#button1").click(function(){
    $("#div2").animate({left: '100px'});
  });
  */

  $("#div1").resizable();

  $('#div1').resize(function(){
     $('#div2').width($("#parent").width()-$("#div1").width());
  });
  $(window).resize(function(){
     $('#div2').width($("#parent").width()-$("#div1").width());
     $('#div1').height($("#parent").height());
  });

  $("#button2").click(function(){

      $("#div2").animate({width: $("#parent").width() - $("#div1").width() - $("#div0").width(), opacity: '0.4'}, 1000);
      $("#div0").toggle(1000);
      console.log($("#div0"));
      /*
      div.animate({width: '300px', opacity: '0.8'}, "slow");
      div.animate({height: '100px', opacity: '0.4'}, "slow");
      div.animate({width: '100px', opacity: '0.8'}, "slow");
      */

      /*
      $("#div0").toggle(function(){
        if($("#div0")[0].style.display == 'block'){

          $("#div1").width($("#parent").width() - $("#div2").width() - $("#div0").width());

        }
      });
      */

  });
  $("#button3").click(function () {

      // Set the effect type
      var effect = 'slide';

      // Set the options for the effect type chosen
      var options = { direction: 'right' };

      // Set the duration (default: 400 milliseconds)
      var duration = 500;

      $('#div2').toggle(effect, '', duration);
      $('#div3').toggle(effect, options, duration);
  });
  $("#button4").click(function () {

      // Set the effect type
      var effect = 'slide';

      // Set the options for the effect type chosen
      var options = { direction: 'right' };

      // Set the duration (default: 400 milliseconds)
      var duration = 500;

      $('#div3').toggle(effect, options, duration);
      $('#div2').toggle(effect, '', duration);
  });

  /************************/
  $scope.searchAsync = function(term){
      var deferred = $q.defer();
      $http({method:'get', url:'http://localhost:8080/cgi-bin/cgiip.exe/WService=wsbroker1/adz/user.p?serviceName=getSmallUserlist' , params:{searchUser: term}}).then(
        function(data){
          var x2js = new X2JS();
          var data = x2js.xml_str2json(data.data);
          data = data.dsWebService.ttUser;
          //console.log(data);
          deferred.resolve(data);
      });
      return deferred.promise;
  }

  function getBenutzer(callback){

      $http({method:'get', url:'http://localhost:8080/cgi-bin/cgiip.exe/WService=wsbroker1/adz/user.p?serviceName=getUserlist' , params:{searchUser: 'bol'}}).then(
        function(data){
          var x2js = new X2JS();
          var data = x2js.xml_str2json(data.data);
          data = data.dsWebService.ttBenutzer;
          console.log(data);
          callback(data);
      });

  }

  var callback = function (data){
    $scope.users = data;
  }

  getBenutzer(callback);

  $scope.state = 'AL';
  $scope.states = [
      { id: 'AL', name: 'Alabama' },
      { id: 'AK', name: 'Alaska' },
      { id: 'AS', name: 'American Samoa' },
      { id: 'AZ', name: 'Arizona' },
      { id: 'AR', name: 'Arkansas' },
      { id: 'CA', name: 'California' },
      { id: 'CO', name: 'Colorado' },
      { id: 'CT', name: 'Connecticut' },
      { id: 'DE', name: 'Delaware' },
      { id: 'DC', name: 'District Of Columbia' },
      { id: 'FM', name: 'Federated States Of Micronesia' },
      { id: 'FL', name: 'Florida' },
      { id: 'GA', name: 'Georgia' },
      { id: 'GU', name: 'Guam' },
      { id: 'HI', name: 'Hawaii' },
      { id: 'ID', name: 'Idaho' },
      { id: 'IL', name: 'Illinois' },
      { id: 'IN', name: 'Indiana' },
      { id: 'IA', name: 'Iowa' },
      { id: 'KS', name: 'Kansas' },
      { id: 'KY', name: 'Kentucky' },
      { id: 'LA', name: 'Louisiana' },
      { id: 'ME', name: 'Maine' },
      { id: 'MH', name: 'Marshall Islands' },
      { id: 'MD', name: 'Maryland' },
      { id: 'MA', name: 'Massachusetts' },
      { id: 'MI', name: 'Michigan' },
      { id: 'MN', name: 'Minnesota' },
      { id: 'MS', name: 'Mississippi' },
      { id: 'MO', name: 'Missouri' },
      { id: 'MT', name: 'Montana' },
      { id: 'NE', name: 'Nebraska' },
      { id: 'NV', name: 'Nevada' },
      { id: 'NH', name: 'New Hampshire' },
      { id: 'NJ', name: 'New Jersey' },
      { id: 'NM', name: 'New Mexico' },
      { id: 'NY', name: 'New York' },
      { id: 'NC', name: 'North Carolina' },
      { id: 'ND', name: 'North Dakota' },
      { id: 'MP', name: 'Northern Mariana Islands' },
      { id: 'OH', name: 'Ohio' },
      { id: 'OK', name: 'Oklahoma' },
      { id: 'OR', name: 'Oregon' },
      { id: 'PW', name: 'Palau' },
      { id: 'PA', name: 'Pennsylvania' },
      { id: 'PR', name: 'Puerto Rico' },
      { id: 'RI', name: 'Rhode Island' },
      { id: 'SC', name: 'South Carolina' },
      { id: 'SD', name: 'South Dakota' },
      { id: 'TN', name: 'Tennessee' },
      { id: 'TX', name: 'Texas' },
      { id: 'UT', name: 'Utah' },
      { id: 'VT', name: 'Vermont' },
      { id: 'VI', name: 'Virgin Islands' },
      { id: 'VA', name: 'Virginia' },
      { id: 'WA', name: 'Washington' },
      { id: 'WV', name: 'West Virginia' },
      { id: 'WI', name: 'Wisconsin' },
      { id: 'WY', name: 'Wyoming' }
  ];

  $scope.reset = function () {
      $scope.state = undefined;
  };

  $scope.isCustomEnabled = true;
  $scope.custom = ['Item 1', 'Item 2', 'Item 3'];
  $scope.customOptions = {
      displayText: 'This text is modifyable',
      emptyListText: 'Oops! The list is empty',
      emptySearchResultText: 'Sorry, couldn\'t find "$0"'
  };

  $scope.growable = ['Item 1', 'Item 2', 'Item 3'];
  $scope.growableOptions = {
      displayText: 'Select or add a new item...',
      addText: 'Add new item',
      onAdd: function () {
          var newItem = 'Item ' + ($scope.growable.length + 1);
          $scope.growable.push(newItem);
          return newItem;
      }
  };

  $scope.people = [
      { name: 'John Doe', phone: '555-123-456', picture: 'http://www.saintsfc.co.uk/images/common/bg_player_profile_default_big.png' },
      { name: 'Axel Zarate', phone: '888-777-6666', picture: 'https://avatars0.githubusercontent.com/u/4431445?s=60' },
      { name: 'Walter White', phone: '303-111-2222', picture: 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg' }
  ];

  $scope.nestedItemsLevel1 = ['Item 1', 'Item 2', 'Item 3'];
  $scope.level1Options = {
      onSelect: function (item) {
          var items = [];
          for (var i = 1; i <= 5; i++) {
              items.push(item + ': ' + 'Nested ' + i);
          }
          $scope.nestedItemsLevel2 = items;
      }
  };

  $scope.nestedItemsLevel2 = [];

}]);


