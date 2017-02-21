'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Terminos-Y-Condiciones
* @description
* 
* ---
* Controlador encargado aceptar los terminos y condiciones
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/termsCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/termsCtrl.js** `// recurso`
* ---
*
*
* # Validaciones:
* ---
* 
* 1. Si no ha aceptado los terminos no puede continuar
*
*/

angular
  .module('judgesApp')
  .controller(
		'termsCtrl',
		function($scope, $stateParams, $window, $http, API){
			// obtenemos el codigo de la simulacion
			$scope.idSimulation = $stateParams.idSimulation;

			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = false;
			$scope.$parent.background = 'bg-terms';

			// variable que controlara cuando mostrar el menu
			$scope.r = {validateTerms:false};

			// dicente/validacion?id=
			
			// validamos ka autentificacion
			$http({
				url: urlBack + 'dicente/validacion',
				method: 'GET',
				headers: { 
					'id': $stateParams.id, 
					'token': $stateParams.token 
				}
			}).success(function (data) {
				// validamos que el estado halla sido correcto
				if(data.status == 'success'){
					$scope.$parent.validateSessionState = true; // mostramos el contendor de los terminos
				}else{
					$scope.$parent.validateSessionState = false;
					$.notify('¡Error validando la sesion, información incorrecta!');
				}
			}).error(function(reason){
				$scope.$parent.validateSessionState = false;
				$.notify('¡Error validando la sesion!');
			});

			/**
			* @ngdoc function
			* @name acceptTerms
			* @methodOf judgesApp.controller:Terminos-Y-Condiciones
			* @returns {array} Arreglo con la informacion de la nueva simulación
			* @description
			* 
			* Esta funcion se encarga de validar que el usuario acepte los terminos y condiciones de una simulacion antes de empezar a editarla o visualizarla, dependiendo de la referencia que exista en el localstorage se va a la pantalla de editar o del programa para visualizarla
			*/
			$scope.acceptTerms = function(){
				if($scope.r.validateTerms){
					// mostramos el cargador
					$scope.$parent.loader();

					// guardamos la variable para posteriores validaciones
					$window.sessionStorage.validateAcceptTerms = $scope.$parent.validateSessionState;
					$window.sessionStorage.idDicente = $stateParams.id;
					$window.sessionStorage.token = $stateParams.token;

					window.location = "#/home";
				}else{
					$('#checkTerms').notify('Debe seleccionar los términos y condiciones');
				}
			}
		}
	)
