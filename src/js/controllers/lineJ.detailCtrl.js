'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Linea-Jurisprudencial-Detalle
* @description
* 
* ---
* Controlador encargado del mapa de procesos.
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/lineJ.detailCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/lineJ.detailCtrl.js** `// recurso`
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
		'lineJ.detailCtrl',
		function($scope, $stateParams, $window, $http, API, $sce){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-simulation';

			// variable que guarda los tipos
			$scope.types = [];

			// variable que guarda las herramientas
			$scope.dataTomo = [];

			// variable que me guarda la informacion de la herramienta seleccionada
			$scope.activeTool = {};

			// variable que guardara la informacion de los casos
			$scope.cases = [];

			// objeto que tendra el carousel
			$scope.dataOwl = null;

			// creamos el carousel
			setTimeout(function(){
				$scope.dataOwl = $('.owl-carousel');

				$scope.dataOwl.owlCarousel({
				    loop:false,
				    items:1,
				    autoHeight: true,
				    autoplay: false,
				    nav: true,
				    navText: ['<','>']
				});
			},500);

			// consultamos las cajas de herramienta
			API.call(
				'dicente/textostomo?id=' + $stateParams.id,
				'GET',
				{},
				function(response){
					console.log(response);
					if(response.status == "success"){
						$scope.dataTomo = response.data;

						// recorremos las herramientas
						/*angular.forEach($scope.dataTomo, function(el, i){
							// cortamos la url
							$scope.dataTomo[i].enlace = $scope.dataTomo[i].enlace.split('ejrlb.demostracionenlinea.com')[1];

							// organizamos los documentos
							$scope.dataTomo[i].enlace = $sce.trustAsResourceUrl($scope.dataTomo[i].enlace);
						});*/

					}else{
						$.notify('No se encontro informacion');
					}
				});

			/*****
			Para generer el pdf
			url: dicente/pdfformulario => Array()
			*******/

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

			// eventos del slider
			$scope.changeView = function(option){
				if(option == 'next'){
					$scope.dataOwl.trigger('next.owl.carousel');
				}else{
					$scope.dataOwl.trigger('prev.owl.carousel');
				}
			}

		}
	)