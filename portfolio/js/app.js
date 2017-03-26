/**
* Version mobile pour les joueurs
* Auteur : Geof
* Date de création : 19/03/2017
*/


var app = angular.module('app', []);

	app.controller('ProfileController', ['$scope', function($scope){
		$scope.user = {
			name: 'DESBROSSES',
			firstname: 'Geoffrey',
			birthdate : 12/09/1994,
			description: 'Hey guys ! That\'s me, I\'m a french full stack developer. I\'m living in Nantes(44) since 2015, where I have made some stuff, I invite you to take a look of my website.'
		};
	}]);

	app.controller('ProjectController',['$scope', '$http', function($scope, $http){
		$scope.description = 'Here we are ! That\'s a list of all my personnal project you can access.';
		
		$scope.projects = [
		{id:1, name:'Wheel', description:'Drink mobile game', date:'01/01/2017', plateform: 'mobile', downloads:[{name:'1.0.0', download:'http://xd.com'}, {name:'2.0.0', download:'http://lol.com'}]},
		{id:2, name:'Margaux Noée', description:'Web site for a photograph', date:'01/01/2017', plateform:'web', website:'http://margauxnoee.com'}
		];
	}]);
	
	app.controller('ContactController', ['$scope', function($scope){
		$scope.description = 'Now you have seen my works, you can send me a message or contact me via linkedin.';
	}]);