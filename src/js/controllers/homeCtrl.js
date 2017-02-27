'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Home
* @description
* 
* ---
* Controlador encargado del template del inicio
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/homeCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/homeCtrl.js** `// recurso`
* ---
*/

angular
  .module('judgesApp')
  .controller(
		'homeCtrl',
		function($scope, API, $sce){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-home';

            // variable que guarda la ruta del pdf
            $scope.dataPDF = {
                ruta: null
            };

            // consultamos el sevicio que me trae el visualizar pdf del home
            API.call(
                'dicente/pdfinicio',
                'GET',
                {},
                function(response){
                    if(response.status == "success"){
                        $scope.dataPDF.ruta = response.data.ruta;
                    }else{
                        console.log('No se encontro pdf a mostrar');
                    }

                    $scope.dataPDF.ruta = $sce.trustAsResourceUrl( $scope.dataPDF.ruta );
                });
		}
	);
