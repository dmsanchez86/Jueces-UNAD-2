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
        'simulacion',
        {
            url: '/simulacion',
            templateUrl: '/templates/simulation.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Simulación'
            }
        }
    ).state(
        'simulacion/caso',
        {
            url: '/simulacion/caso',
            templateUrl: '/templates/simulation.case.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Caso',
                parent: 'simulacion'
            }
        }
    ).state(
        'simulacion/caso/maneraCorrecta',
        {
            url: '/simulacion/caso/maneraCorrecta',
            templateUrl: '/templates/simulation.correctWayCase.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Manera Correcta',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/caso/maneraIncorrecta',
        {
            url: '/simulacion/caso/maneraIncorrecta',
            templateUrl: '/templates/simulation.incorrectWayCase.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Manera Incorrecta',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/instrucciones',
        {
            url: '/simulacion/instrucciones/:idCase',
            templateUrl: '/templates/simulation.instructions.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Instrucciones',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/sustentacion',
        {
            url: '/simulacion/sustentacion/:idCase',
            templateUrl: '/templates/simulation.lift.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Seleccionado',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/caso/leer',
        {
            url: '/simulacion/caso/leer',
            templateUrl: '/templates/simulation.tryCase.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Leer',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/caso/grabarVideo',
        {
            url: '/simulacion/caso/grabarVideo',
            templateUrl: '/templates/simulation.recordVideoCase.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Grabar',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/caso/rubrica',
        {
            url: '/simulacion/caso/rubrica',
            templateUrl: '/templates/simulation.rubric.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Rubrica',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/caso/video',
        {
            url: '/simulacion/caso/video',
            templateUrl: '/templates/simulation.showVideoCase.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Video Grabado',
                parent: 'simulacion/caso'
            }
        }
    ).state(
        'simulacion/fin',
        {
            url: '/finSimulacion',
            templateUrl: '/templates/simulation.end.html',
            controller: 'simulationCtrl',
            ncyBreadcrumb: {
                label: 'Fin Simulación',
                parent: 'simulacion'
            }
        }
    ).state(
        'recomendaciones',
        {
            url: '/recomendaciones',
            templateUrl: '/templates/recommendations.html',
            controller: 'recommendationsCtrl',
            ncyBreadcrumb: {
                label: 'Recomendaciones'
            }
        }
    ).state(
        'recomendaciones/juego',
        {
            url: '/recomendaciones/juego',
            templateUrl: '/templates/recommendations.game.html',
            controller: 'recommendationsCtrl',
            ncyBreadcrumb: {
                label: 'Juego',
                parent: 'recomendaciones'
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
        'manejoEstres',
        {
            url: '/manejoEstres',
            templateUrl: '/templates/stressManagement.html', 
            controller: 'stressManagementCtrl',
            ncyBreadcrumb: {
                label: 'Manejo del Estres'
            }
        }
    ).state(
        'manejoEstres/juego',
        {
            url: '/manejoEstres/juego',
            templateUrl: '/templates/stressManagement.game.html', 
            controller: 'stressManagementCtrl',
            ncyBreadcrumb: {
                label: 'Juego',
                parent: 'manejoEstres'
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