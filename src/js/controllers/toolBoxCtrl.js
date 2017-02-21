'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Caja-Herramientas
* @description
* 
* ---
* Controlador encargado de la caja de herramientas
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/toolBoxCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/toolBoxCtrl.js** `// recurso`
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
		'toolBoxCtrl',
		function($scope, $stateParams, $window, $http, API, $sce){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-box';

			// variable que guarda los tipos
			$scope.types = [];

			// variable que guarda las herramientas
			$scope.toolsBox = [];

			// variable que me guarda la informacion de la herramienta seleccionada
			$scope.activeTool = {};

			// variable que guardara la informacion de los casos
			$scope.cases = [];

			// consultamos las cajas de herramienta
			API.call(
				'dicente/cajaherramientas?id=1&l=10&c=0',
				'GET',
				{},
				function(response){
					console.log(response);
					if(response.status == "success"){
						$scope.toolsBox = response.data.herramientas;

						// recorremos las herramientas
						angular.forEach($scope.toolsBox, function(el, i){
							// cortamos la url
							$scope.toolsBox[i].enlace = $scope.toolsBox[i].enlace.split('ejrlb.demostracionenlinea.com')[1];

							// organizamos los documentos
							$scope.toolsBox[i].enlace = $sce.trustAsResourceUrl($scope.toolsBox[i].enlace);
						});

					}else{
						$.notify('No se pudieron cargar las herramientas');
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
	);