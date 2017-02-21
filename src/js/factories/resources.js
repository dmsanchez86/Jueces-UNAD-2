'use strict';

angular
	.module('judgesApp')

    /**
     * @ngdoc service 
     * @name judgesApp.Validar-Login 
     * @requires judgesApp.controller:Login
     * @description
     * ---
     * 
     * Función que permite hacer la petición al web service y me retorna la respuesta del servidor.
    **/

	.factory('validateLogin', function($resource){
		return $resource(urlBack + 'v1/auth/',
			{
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: false
                }
            });
	})

    /**
     * @ngdoc service 
     * @name judgesApp.Validar-Recuperar-Contraseña
     * @requires judgesApp.controller:Recuperar-Clave
     * @description
     * ---
     * 
     * Función que permite hacer la petición al web service y me retorna si el correo electronico existe en la aplicación.
    **/

	.factory('recoveryPasswordValidation', function($resource){
		return $resource(urlBack + 'v1/auth/reset',
			{
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: false
                }
            });
	})

	/**
     * @ngdoc service 
     * @name judgesApp.Documentos-Generales
     * @requires judgesApp.controller:Home
     * @description
     * ---
     * 
     * Función que hace la petición al servicio web y me obtiene la lista de documentos generales
    **/

	.factory('recoveryPasswordValidation', function($resource){
		return $resource(urlBack + 'v1/auth/reset',
			{
                id: '@id'
            },
            {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: false
                }
            });
	});