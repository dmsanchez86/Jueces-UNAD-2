'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Linea-Jurisprudencial
* @description
* 
* ---
* Controlador encargado del mapa de procesos.
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/lineJCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/lineJCtrl.js** `// recurso`
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
		'lineJCtrl',
		function($scope, $stateParams, $window, $http, API, $sce){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-box';

			// variable que guarda los tipos
			$scope.types = [];

			// variable que guarda las herramientas
			$scope.dataLine = [];

			// variable que me guarda la informacion de la herramienta seleccionada
			$scope.activeTool = {};

			// variable que guardara la informacion de los casos
			$scope.cases = [];

			// consultamos las cajas de herramienta
			API.call(
				'dicente/lineajurisprudencial?tipo=jurisprudencial',
				'GET',
				{},
				function(response){
					console.log(response);
					if(response.status == "success"){
						$scope.dataLine = response.data;

						// recorremos las herramientas
						angular.forEach($scope.dataLine, function(el, i){
							// cortamos la url
							$scope.dataLine[i].enlace = $scope.dataLine[i].enlace.split('ejrlb.demostracionenlinea.com')[1];

							// organizamos los documentos
							$scope.dataLine[i].enlace = $sce.trustAsResourceUrl($scope.dataLine[i].enlace);
						});

					}else{
						$.notify('No se encontro informacion');
					}
				});

			// función que permite ver una herramienta
			$scope.seeTool = function(tool){
				$scope.activeTool = tool;

				$("#myModal").modal();
			}
			$scope.seeCases = function(){
				// consultamos los casos
				API.call(
					'dicente/casos',
					'GET',
					{},
					function(response){
						console.log(response);
						if(response.status == "success"){
							$scope.cases = response.data.casos;
							console.log($scope.cases);

							// recorremos los documentos para organizar el enlace
							angular.forEach($scope.cases, function(el, i){
								// cortamos la url
								$scope.cases[i].documento = $scope.cases[i].documento.split('ejrlb.demostracionenlinea.com')[1];

								// organizamos los documentos
								$scope.cases[i].documento = $sce.trustAsResourceUrl($scope.cases[i].documento);
							});

							$("#myModalCases").modal();
						}else{
							$.notify('No se encontraron casos');
						}
					});
			}

		}
	)