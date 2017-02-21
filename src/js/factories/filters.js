'use strict';

/**
* @ngdoc filter
* @name judgesApp.join 
* @param {array} Arreglo Arreglo que se unira 
* @param {delimiter} Delimitador Delimitador con el que se arreglara el array  
* @requires judgesApp.controller:Documentos-Generales
* @description
* 
* Filtro basado en la función `join()` de JavaScript
* 
*/

angular
	.module('judgesApp')
	.filter('join', function(){
		return function(array, delimiter){
			return (array || []).join(delimiter || ',');
		};
	});