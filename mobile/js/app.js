/**
* Version mobile pour les joueurs
* Auteur : Geof
* Date de création : 01/01/2017
*/


const config = {
	url : "https://1-dot-geoffreydesbrosses-1129.appspot.com/_ah/api/message/v1/"
};

angular.module('app', [])
   

	.controller('GameController',['$scope', '$http', function($scope, $http){
		
		$scope.choices = ['geof','bob'];
		$scope.colors = ['rgb(49, 140, 231)','rgb(237, 0, 0)','rgb(52, 201, 36)','rgb(252, 220, 18)','rgb(237, 127, 16)','rgb(136, 77, 167)','rgb(255,255,255)'];
		$scope.hasard = 0;
		$scope.rotation = '';
		$scope.messages = [];
		$scope.message = '';
		
		
		// Initialise les messages en provenance du serveur.
		$scope.listMessages = function(){
			$http.get(config.url+"listValid")
				.success(function(data){
					$scope.messages = angular.fromJson(data.items);
				})
				.error(function(){
					//Erreur lors de la récupération des messages du serveur
				}); 
		}
		$scope.listMessages();
		
		//Met une chaine de caractere sous un format special pour la comparer avec une autre
		$scope.format = function(my_string){			
			return my_string.trim().replace(/ /g,"").toUpperCase();
		}
		
		
		//Change les messages avec lesquels jouer
		$scope.updateMessage = function (message) {
		    message.active = !message.active;
		}
		
		
		
		//Ajoute un message avec lequel jouer
		$scope.newMessage = function(newMessage){
			for(var i=0; i<$scope.messages.length; i++){
				if($scope.format($scope.messages[i].content) == $scope.format(newMessage)){
					$scope.messageContent = null;
					return null;
				}
			}
			
			var date = new Date();
			var dateFormat = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
			var message = {name: 'joueur', content: newMessage, active:true, valid:false, date:dateFormat};
			var messageJson = angular.toJson(message);
			$scope.messages.push(message);
			$scope.messageContent = null;
			
			$http.post( config.url+"create", messageJson)
				.success(function(data){
					//Succes
				})
				.error(function(){
					//Echec de l'envoie au serveur
				}); 
		}


		//Change la fenetre en cours a partir du menu.
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

		}



		//Fait tourner la roue
		$scope.turn = function(){
			//Fais tourner visiellement la roue
			$scope.hasard += Math.random()*10000;
			$scope.rotation = {'transform':'rotate('+$scope.hasard+'deg)'};
			
			//Change le message
			var newMessage = $scope.messages[Math.round(Math.random()*($scope.messages.length-1))];
			while(newMessage == $scope.message || !newMessage.active){
				newMessage = $scope.messages[Math.round(Math.random()*($scope.messages.length-1))];
			}
			$scope.message = newMessage;
		}
		
		
		
		
		$scope.addChoice = function(newChoice){
			
			//Ajout du joueur
			$scope.choices.push(newChoice);
		}
		
	}])