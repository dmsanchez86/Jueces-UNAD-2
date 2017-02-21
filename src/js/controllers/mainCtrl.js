'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Principal
* @description
* 
* ---
* Controlador principal encargado de las validaciones
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/mainCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/mainCtrl.js** `// recurso`
* ---
*
*
* # Validaciones:
* ---
*
* 1. Si no ha aceptado los terminos no puede continuar
*/

angular
  .module('judgesApp')
  .controller(
		'mainCtrl',
		function($scope, $stateParams, $window, $http, API, $timeout){
			// validamos desde que navegador esta ingresando
			if(window.navigator.userAgent.indexOf("Edge") > -1){
				$('#modalBrowsers').modal(); // Si es edge le mostramos el popup
			}

			// variable que controlara la validacion del login
			$scope.validateSessionState = true;
			
			// verificamos si ya habia aceptado
			if($window.sessionStorage.validateAcceptTerms != null){
				$scope.validateSessionState = JSON.parse($window.sessionStorage.validateAcceptTerms);
			}

			// ocultamos el cargador
			$('.loader').delay(2000).fadeOut(1000);

			// variable que controla el fondo principal
			$scope.background = 'bg-terms';

			/**
			* @ngdoc function
			* @name loader
			* @methodOf judgesApp.controller:Principal
			* @description
			* 
			* Funcion que permite llamar el cargador en cualquier controlador hijo, y pone el scroll siempre animado en el top de la pagina
			*/
			$scope.loader = function(){
				// ponemos el scroll arriba
				$("body").animate({ scrollTop: 0 }, 250);

				NProgress.start();

				$timeout(function(){ NProgress.done(); },500);
			}
		}
	);
