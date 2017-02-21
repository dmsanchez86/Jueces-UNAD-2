'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Home
* @description
* 
* ---
* Controlador encargado del template del inicio
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/homeCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/homeCtrl.js** `// recurso`
* ---
*/

angular
  .module('judgesApp')
  .controller(
		'homeCtrl',
		function($scope){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-home';
		}
	);
