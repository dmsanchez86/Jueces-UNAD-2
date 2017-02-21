'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Recomendaciones
* @description
* 
* ---
* Controlador encargado del template de las recomendaciones
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/recommendationsCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/recommendationsCtrl.js** `// recurso`
* ---
*/

angular
  .module('judgesApp')
  .controller(
		'recommendationsCtrl',
		function($scope, $stateParams, $window, $http, API){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-recommendations';

			// variable que me guardara las recomendaciones
			$scope.recommendations = [];

			// validamos si existe la variable para leer las recomendaciones de nuevo
			if($window.sessionStorage.readAgainRecommendations){
				if($window.sessionStorage.readAgainRecommendations != null){
					setTimeout(function(){
						$('.btn.btn-primary.center-block').click();
					},1000);

					// eliminamos la variable
					delete $window.sessionStorage.readAgainRecommendations;
				}
			}

			// función que me muestra las recomendaciones
			$scope.seeRecommendations = function(){
				// consultamos las recomendaciones
				API.call(
						'dicente/recomendaciones?id=4',
						'GET',
						{},
						function(response){
							console.log(response);
							if(response.status == "success"){
								$scope.recommendations = response.data;
								$("#myModal").modal();
							}else{
								$.notify('No se pudieron cargar las recomendaciones');
							}
						}
					);
			}

			// variable que guarda toda la información del juego
			$scope.dataGame = [];
			$scope.dataOwl = null;

			// funcion que me consulta el juego
			$scope.seeGame = function(){
				// consulto las preguntas
				API.call(
						'dicente/juegopreguntas',
						'GET',
						{},
						function(response){
							console.log(response);
							if(response.status == "success"){
								$scope.dataGame = response.data;

								$scope.stateGame = true;

								if($scope.dataGame.length > 1){
									setTimeout(function(){
										$scope.dataOwl = $('.owl-carousel');

										$scope.dataOwl.owlCarousel({
										    loop:false,
										    items:1,
										    autoHeight: true,
										    autoplay: false,
										});
									},500);
								}

								$("#myModalGame").modal();
							}else{
								$.notify('No se pudieron cargar las recomendaciones');
							}
						}
					);
			}

			// evento que me destruye el owl carousel
			$scope.destroyOwlCarousel = function(){
				$scope.stateGame = false;
				$scope.dataOwl.trigger('destroy.owl.carousel');
			}

			// funcion que me permite validar cual es la respuesta correcta
			$scope.validateAnswer = function(question, answer){
				
				if(question.pregunta.respuesta == answer.respuesta){
					alert('Correcta');
				}else{
					alert('Incorrecta');
				}

				$scope.dataOwl.trigger('next.owl.carousel');
			}
		}
	);
