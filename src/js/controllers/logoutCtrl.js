'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Cerrar-Sesion
* @description
* 
* ---
* Controlador encargado de cerrar la sesión.
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/logoutCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/logoutCtrl.js** `// recurso`
* ---
*
*
* # Validaciones:
* ---
*
* 1. Elimino todos los datos de la sesión
*
* # Dependencias
* ---
* 1. $window
*/


angular
  .module('judgesApp')
  .controller(
		'logoutCtrl',
		function($scope, $window){

			// eliminamos las variables de sesion
			delete $window.sessionStorage.dataUser;
			delete $window.sessionStorage.token;
			delete $window.sessionStorage.documentActive;
			delete $window.sessionStorage.simulationActive;
			delete $window.sessionStorage.newSimulation;

			// se redirecciona al login
			window.location = "../index.html";
		}
	)