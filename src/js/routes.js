'use strict';

/**
 * @ngdoc overview
 * @name judgesApp.config:routes
 * @description
 * Este archivo es el encargado de manejar todas las rutas de la aplicación:
 *
 * ---
 * - **Ruta del Recurso: ./dist/src/js/routes.js** `// minificado`
 * - **Ruta del Recurso: ./src/src/js/routes.js** `// recurso`
 * ---
 * 
 * Se utiliza el modulo ui.router para el manejo de las url por estados y asi poder hacerlo compatible con el breadcrumb, si se ingresa una url que no este registrada se redirecciona a la **raiz**
 */

angular
  .module('judgesApp')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state(
        'terminosYCondiciones',
        {
            url: '/terminosYCondiciones/:id/:token',
            templateUrl: '/templates/terms.html',
            controller: 'termsCtrl',
            ncyBreadcrumb: {
                label: 'Terminos y Condiciones'
            }
        }
    ).state(
        'home',
        {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'homeCtrl',
            ncyBreadcrumb: {
                label: 'Home'
            }
        }
    ).state(
        'mapaProceso',
        {
            url: '/mapaProceso',
            templateUrl: '/templates/processMap.html',
            controller: 'processMapCtrl',
            ncyBreadcrumb: {
                label: 'Mapa de Proceso'
            }
        }
    ).state(
        'ejemplos',
        {
            url: '/ejemplos',
            templateUrl: '/templates/examples.html',
            controller: 'examplesCtrl',
            ncyBreadcrumb: {
                label: 'Ejemplos'
            }
        }
    ).state(
        'lineaJurisprudencial',
        {
            url: '/lineaJurisprudencial',
            templateUrl: '/templates/lineJ.html',
            controller: 'lineJCtrl',
            ncyBreadcrumb: {
                label: 'Linea Jurisprudencial'
            }
        }
    ).state(
        'cajaHerramientas',
        {
            url: '/cajaHerramientas',
            templateUrl: '/templates/toolBox.html', 
            controller: 'toolBoxCtrl',
            ncyBreadcrumb: {
                label: 'Caja de Herramientas'
            }
        }
    ).state(
        'salir',
        {
            url: '/logout',
            templateUrl: '/templates/logout.html', 
            controller: 'logoutCtrl',
            ncyBreadcrumb: {
                label: 'Cerrando Sesión'
            }
        }
    );

    $urlRouterProvider.otherwise('/');
});