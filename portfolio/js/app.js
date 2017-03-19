/**
* Version mobile pour les joueurs
* Auteur : Geof
* Date de création : 19/03/2017
*/


angular.module('app', [])

	.controller('ProjectController',['$scope', '$http', function($scope, $http){
		$scope.projects = [
		{name:'Wheel', description:'Drink mobile game', date:01/01/17, plateform: 'mobile', versions:[{name:'1.0.0', download:'http://xd.com'}, {name:'2.0.0', download:'http://lol.com'}]}
		];
		
		
	}])