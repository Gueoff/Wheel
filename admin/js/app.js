/**
* Version web pour administrateur
* Auteur : Geof
* Date de création : 01/01/2017
*/


const config = {
	    url : "https://1-dot-geoffreydesbrosses-1129.appspot.com/_ah/api/message/v1/"
};

angular.module('app', [])
   
	.controller('GameController',['$scope', '$http', function($scope, $http){	
	
		$scope.messages = [];
		
		// Initialise les messages en provenance du serveur.
		$scope.listMessages = function(){
			$http.get(config.url+"list")
				.success(function(data){
					$scope.messages = angular.fromJson(data.items);
				})
				.error(function(){
					alert('Impossible de lister les messages...');  
				}); 
				
		}
		
		$scope.listMessages();
		
		//Met une chaine de caractere sous un format special pour la comparer avec une autre
		$scope.format = function(my_string){			
			return my_string.trim().replace(/ /g,"").toUpperCase();
		}

		
		// Valide un message
		$scope.validMessage = function (message) {
		    message.valid = true;
			var messageJson = angular.toJson(message);
                
			$http.put(config.url+"update", messageJson)
			    .success(function(data){
					//Succes
			})
			.error(function(){
				alert("Erreur lors de la validation d'un message");  
			}); 
		}
		

		
		//Supprime un message
		$scope.deleteMessage = function (message) {
		    message.valid = false;
			$http.delete(config.url+"remove", {id : message.id})
				.success(function(data){
				    $scope.messages.splice($scope.messages.indexOf(message), 1);
			})
			.error(function(){
				alert("Erreur lors de la suppression d'un message");  
			}); 	
		}
		
		
		//Ajoute un nouveau message sur le serveur
		$scope.newMessage = function (newMessage) {
			for(var i=0; i<$scope.messages.length; i++){
				if($scope.format($scope.messages[i].content) == $scope.format(newMessage)){
					$scope.messageContent = null;
					return null;
				}
			}
			var date = new Date();
			var dateFormat = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
			var message = {name: 'admin', content: newMessage, active:true, valid:true, date:dateFormat};
			var messageJson = angular.toJson(message);
			
			
			$http.post(config.url+"create", messageJson)
				.success(function(data){
					$scope.messages.push(message);
					$scope.messageContent = null;
				})
				.error(function(){
					alert("Erreur lors de la création d'un message");  
				}); 	
		}


	}])