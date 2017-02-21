'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Manejo-Estres
* @description
* 
* ---
* Controlador encargado de todo lo del manejo del estress
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/stressManagementCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/stressManagementCtrl.js** `// recurso`
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
		'stressManagementCtrl',
		function($scope, $stateParams, $window, $http, API){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-stress';

			// variable que me guardara las recomendaciones
			$scope.recommendations = [];

			// función que me muestra las recomendaciones
			$scope.seeRecommendations = function(){
				// consultamos las recomendaciones
				API.call(
						'dicente/recomendaciones?id=5',
						'GET',
						{},
						function(response){
							console.log(response);
							if(response.status == "success"){
								$scope.recommendations = response.data;
								$("#myModal").modal();
							}else{
								$.notify('No se pudieron cargar las recomendaciones');
							}
						}
					);
			}

			// variable encargada de mostrar o no el juego
			$scope.viewGame = false;

			$scope.showGame = function(){
				$scope.$parent.background = 'bg-stress bg-game';

				// validamos el tamaño de la pantalla
				$("#myModalGame").modal();
			}
		}
	);
