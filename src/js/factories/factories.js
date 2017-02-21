'use strict';

angular
	.module('judgesApp')
	/**
     * @ngdoc service 
     * @name judgesApp.RequestToAPI
     * @requires judgesApp.controller:Principal-Admin
     * @description
     * ---
     * 
     * Función que permite hacer todas las peticiones dependiendo del metodo y la informacion necesaria
     @example
		API.call('my route', 'my method', {object data}, function(response){
			// validamos que el estado halla sido correcto y tenga informacion
			if(response.status == 'success' && response.data != null){
				// success
			}
			else{
				// error
			}
		});
    */

	.factory('API', function($http, $window){
		var API = {};

		API.call = function(_url, _method, _data, callback){
			$http({
				url: urlBack + _url,
				method: _method,
				headers: { 
					'app-token': $window.sessionStorage.token
				},
				data: _data
			})
			.success(callback)
			.error(function(reason){
				// validamos primero que no sea un error de base de datos
				if(reason.exception){
					$.notify('¡Error con la base de datos!');
					return;
				}

				if(reason.status == 'error'){
					// validamos que no halla cerrado sesion
					if(reason.data.title == "'No Autorizado.'"){
						$.notify('¡Sesión expirada, vuelva a iniciar sesión!');
					
						window.location = "#/logout";
					}else{
						$.notify('¡Error de conexion!');
					}
				}
			});
		}

		return API;
	});