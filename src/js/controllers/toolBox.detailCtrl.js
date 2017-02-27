'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Detalle-Herramienta
* @description
* 
* ---
* Controlador encargado de la caja de herramientas
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/toolBox.detailCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/toolBox.detailCtrl.js** `// recurso`
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
		'toolBox.detailCtrl',
		function($scope, $stateParams, $window, $http, API, $sce){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-simulation-02';

			// variable que guarda los tipos
			$scope.types = [];

			// variable que guarda las herramientas
			$scope.toolsBoxDetail = [];

			// variable que me guarda la informacion de la herramienta seleccionada
			$scope.activeTool = {};

			// variable que guardara la informacion de los casos
			$scope.cases = [];

            $scope.stateContent = false;
            $scope.statePopup = false;

            $scope.selectItem = {};

			// consultamos las cajas de herramienta
			API.call(
				'dicente/documentoherramienta?id='+ $stateParams.id,
				'GET',
				{},
				function(response){
					console.log(response);
					if(response.status == "success"){
						$scope.toolsBoxDetail = response.data;

                        // dependiendo de la referencia se muestra lo indicado
                        if(typeof $scope.toolsBoxDetail == 'object' || typeof $scope.toolsBoxDetail == 'array'){
                            $scope.stateContent = $scope.toolsBoxDetail.length == 0 ? false : true;
                            $scope.statePopup = false;
                        }else{
                            $scope.stateContent = false;
                            $scope.statePopup = true;

                            $scope.selectItem.enlace = response.data;
                            $scope.selectItem.enlace = $sce.trustAsResourceUrl( $scope.selectItem.enlace );

                            setTimeout(function(){
				                $("#myModal").modal();
                            }, 500);
                        }

					}else{
						$.notify('No se encontro informacion');
					}
				});

			// función que permite ver los ejemplos en cada tab
			$scope.seeExample = function(_case, i, $event){
                $('.tab-content > div').removeClass('active');
                $('#itemExample' + (i + 1)).addClass('active');
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