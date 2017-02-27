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

var folder = '/judges2';

angular
  .module('judgesApp')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state(
        'terminosYCondiciones',
        {
            url: '/terminosYCondiciones/:id/:token',
            templateUrl: folder + '/templates/terms.html',
            controller: 'termsCtrl',
            ncyBreadcrumb: {
                label: 'Terminos y Condiciones'
            }
        }
    ).state(
        'home',
        {
            url: '/home',
            templateUrl: folder + '/templates/home.html',
            controller: 'homeCtrl',
            ncyBreadcrumb: {
                label: 'Home'
            }
        }
    ).state(
        'mapaProceso',
        {
            url: '/mapaProceso',
            templateUrl: folder + '/templates/processMap.html',
            controller: 'processMapCtrl',
            ncyBreadcrumb: {
                label: 'Mapa de Proceso'
            }
        }
    ).state(
        'ejemplos',
        {
            url: '/ejemplos',
            templateUrl: folder + '/templates/examples.html',
            controller: 'examplesCtrl',
            ncyBreadcrumb: {
                label: 'Ejemplos'
            }
        }
    ).state(
        'detalle',
        {
            url: '/detalle/:id',
            templateUrl: folder + '/templates/examples.detail.html',
            controller: 'examples.detailCtrl',
            ncyBreadcrumb: {
                label: 'Detalle'
            }
        }
    ).state(
        'lineaJurisprudencial',
        {
            url: '/lineaJurisprudencial',
            templateUrl: folder + '/templates/lineJ.html',
            controller: 'lineJCtrl',
            ncyBreadcrumb: {
                label: 'Linea Jurisprudencial'
            }
        }
    ).state(
        'detalleLinea',
        {
            url: '/detalleLinea/:id',
            templateUrl: folder + '/templates/lineJ.detail.html',
            controller: 'lineJ.detailCtrl',
            ncyBreadcrumb: {
                label: 'Detalle Linea Jurisprudencial'
            }
        }
    ).state(
        'cajaHerramientas',
        {
            url: '/cajaHerramientas',
            templateUrl: folder + '/templates/toolBox.html', 
            controller: 'toolBoxCtrl',
            ncyBreadcrumb: {
                label: 'Caja de Herramientas'
            }
        }
    ).state(
        'detalleHerramienta',
        {
            url: '/detalleHerramienta/:id',
            templateUrl: folder + '/templates/toolBox.detail.html', 
            controller: 'toolBox.detailCtrl',
            ncyBreadcrumb: {
                label: 'Detalle Herramienta'
            }
        }
    ).state(
        'salir',
        {
            url: '/logout',
            templateUrl: folder + '/templates/logout.html', 
            controller: 'logoutCtrl',
            ncyBreadcrumb: {
                label: 'Cerrando Sesión'
            }
        }
    );

    $urlRouterProvider.otherwise('/');
});