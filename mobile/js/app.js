/**
* Version mobile pour les joueurs
* Auteur : Geof
* Date de création : 01/01/2017
*/
const config = {
	url : "https://1-dot-geoffreydesbrosses-1129.appspot.com/_ah/api/message/v1/"
};

angular.module('app', []).controller('GameController',['$scope', '$http', function ($scope, $http){
  $scope.players = ['a','b','c'];
  $scope.stylePlayers = [];
  $scope.styleDrawbar = [];
  $scope.hasard = 0;
  $scope.rotation = '';
  $scope.messages = [];
  $scope.message = '';

  // Initialize message list.
  $scope.listMessages = function (){
    $http.get(config.url+"listValid")
      .success(function(data){
        $scope.messages = angular.fromJson(data.items);
      })
      .error(function(){
        //Erreur lors de la récupération des messages du serveur
      });
  };

  // Unification of message content.
  $scope.format = function (my_string){
    return my_string.trim().replace(/ /g,"").toUpperCase();
  };

  // Update the current message list.
  $scope.updateMessage = function (message) {
      message.active = !message.active;
  };

  // Add a message to the list.
  $scope.newMessage = function (newMessage){
    for(var i=0; i < $scope.messages.length; i++){
      if($scope.format($scope.messages[i].content) == $scope.format(newMessage)){
        return null;
      }
    }
    var date = new Date();
    var dateFormat = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    var message = {name: 'joueur', content: newMessage, active:true, valid:false, date:dateFormat};
    var messageJson = angular.toJson(message);
    $scope.messages.push(message);

    $http.post( config.url+"create", messageJson)
      .success(function (data){
        // Succes.
      })
      .error(function (){
        // Fail.
      });
  };

  // Change the current view.
  $scope.change = function (page) {
    if(page == "game"){
      document.getElementById('btnGame').classList.add('active');
      document.getElementById('btnOption').classList.remove('active');
      document.getElementById('game').classList.remove('left');
      document.getElementById('option').classList.add('right');
    }
    else {
      document.getElementById('btnGame').classList.remove('active');
      document.getElementById('btnOption').classList.add('active');
      document.getElementById('game').classList.add('left');
      document.getElementById('option').classList.remove('right');
    }

  };

  // Turn the wheel.
  $scope.turn = function () {
    // Change wheel style.
    $scope.hasard += Math.random()*3000;
    var duration = 1 + (Math.random()*4);
    $scope.rotation = {
      'transform':'rotate('+$scope.hasard+'deg)',
      'transition':'transform ' + duration + 's ease-in-out',
    };

    // Change the message.
    var newMessage = $scope.messages[Math.round(Math.random()*($scope.messages.length-1))];
    while(newMessage == $scope.message || !newMessage.active){
      newMessage = $scope.messages[Math.round(Math.random()*($scope.messages.length-1))];
    }
    $scope.message = newMessage;
  };

  // Initialize player style on wheel.
  $scope.changePlayerStyle = function () {
    $scope.stylePlayers = [];
    $scope.styleDrawbar = [];
    var style = {};
    var rotation = 0;
    var interval = 360/$scope.players.length;

    // Add style for each player.
    for(var i=0; i < $scope.players.length; i++) {
      rotation = interval*i;
      style = {
          '-webkit-transform': 'rotate(' + rotation + 'deg) translate(0px, -110px)',
          '-o-transform': 'rotate(' + rotation + 'deg) translate(0px, -110px)',
          'transform': 'rotate(' + rotation + 'deg) translate(0px, -110px)'
      };
      $scope.stylePlayers.push(style);
      rotation += interval/2;
      style = {
          '-webkit-transform': 'rotate(' + rotation + 'deg)',
          '-o-transform': 'rotate(' + rotation + 'deg)',
          'transform': 'rotate(' + rotation + 'deg)'
      };
      $scope.styleDrawbar.push(style);
    }
  };

	// Add a player to the game.
  $scope.addPlayer = function (player){
    $scope.players.push(player);
    $scope.changePlayerStyle();
  };

  // Remove a player to the game.
  $scope.removePlayer = function (index){
    $scope.players.splice(index, 1);
    $scope.changePlayerStyle();
  };

  // Initialize the game.
	$scope.initialize = function () {
    $scope.listMessages();
    $scope.changePlayerStyle();
	};
	$scope.initialize();
}])