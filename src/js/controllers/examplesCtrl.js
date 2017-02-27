'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Ejemplos
* @description
* 
* ---
* Controlador encargado de los ejemplos.
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/examplesCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/examplesCtrl.js** `// recurso`
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
		'examplesCtrl',
		function($scope, $window, API){
            // variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-simulation-01';

            // variable que guarda la ruta del pdf
            $scope.dataExamples = [];

            // consultamos el sevicio que me trae los grupos
            API.call(
                'dicente/ejemplo?tipo=ejemplos',
                'GET',
                {},
                function(response){
                    if(response.status == "success"){
                        $scope.dataExamples = response.data;
                    }else{
                        console.log('No se encontro pdf a mostrar');
                        $.notify('No se encontro información', 'info');
                    }
                });
		}
	)