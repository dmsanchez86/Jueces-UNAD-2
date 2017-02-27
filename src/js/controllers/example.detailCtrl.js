'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Detalle-Ejemplo
* @description
* 
* ---
* Controlador encargado de los ejemplos.
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/examples.detailCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/examples.detailCtrl.js** `// recurso`
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
		'examples.detailCtrl',
		function($scope, $window, API, $stateParams, $sce){
            // variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-simulation-02';

            // variable que guarda la ruta del pdf
            $scope.dataDetail = [];

            // consultamos el sevicio que me trae el visualizar pdf del home
            API.call(
                'dicente/ejemplosgrupo?id=' + $stateParams.id,
                'GET',
                {},
                function(response){
                    if(response.status == "success"){
                        $scope.dataDetail = response.data;

                        angular.forEach($scope.dataDetail, function(el, i){
                            $scope.dataDetail[i].informacion.enlace = $sce.trustAsResourceUrl( $scope.dataDetail[i].informacion.enlace );
                        });
                    }else{
                        console.log('No se encontro informaciòn');
                        $.notify('No se encontro información', 'info');
                    }
                });

            // variable que contendra la información del item seleccionado
            $scope.selectItem = [];

            // evento que me muestra el pdf
            $scope.selectPDFToSee = function(item){
                $scope.selectItem = item;

				$("#myModal").modal();
            }

            // función que me muestra el caso
            $scope.seePDF = function(_case, i, $event){
                $('.tab-content > div').removeClass('active');
                $('#itemProgram' + (i + 1)).addClass('active');
            }
		}
	)