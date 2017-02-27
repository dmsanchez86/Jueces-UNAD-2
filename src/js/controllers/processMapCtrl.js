'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Mapa-De-Procesos
* @description
* 
* ---
* Controlador encargado del mapa de procesos.
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/processMapCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/processMapCtrl.js** `// recurso`
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
		'processMapCtrl',
		function($scope, $window, API){		
            $scope.$parent.acceptTerms = true;
            $scope.$parent.background = 'bg-simulation-slide';

            // variable que me guarda la informacion del mapa de procesos
            $scope.dataProcess = [];

            $scope.view = true;

            API.call(
					'dicente/mapaproceso',
					'GET',
					{},
					function(response){
                        console.log(response);
						if(response.status == "success"){
							$scope.dataProcess = response.data;
						}else{
							$.notify('No se encontro informacion', 'info');
						}
					});

            $scope.changeView = function(option){
            	if(option == 'infografico'){
            		$scope.view = true;
            	}else{
            		$scope.view = false;
            	}
            }
		}
	)