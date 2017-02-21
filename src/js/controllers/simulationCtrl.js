'use strict';

/**
* @ngdoc controller
* @name judgesApp.controller:Simulaciones
* @description
* 
* ---
* Controlador encargado de manejar todo el proceso de la simulación
*
* ---
* - **Ruta del Recurso: ./dist/src/js/controllers/simulationsCtrl.js** `// minificado`
* - **Ruta del Recurso: ./src/src/js/controllers/simulationsCtrl.js** `// recurso`
* ---
*/

angular
  .module('judgesApp')
  .controller(
		'simulationCtrl',
		function($scope, $stateParams, $window, $http, API, $sce, $timeout, $state){
			// variable que controlara cuando mostrar el menu
			$scope.$parent.acceptTerms = true;
			$scope.$parent.background = 'bg-simulation-01';

			// variable que guarda los casos
			$scope.cases = [];

			// variable que me guarda la información del caso seleccionado
			$scope.selectCase = [];

			// variable que controla el progreso de la simulacion
			$scope.progressSimulation = 30;

			$scope.seeCorrectWay = function(){
				$("#myModalCorrect").modal();
			}

			$scope.seeIncorrectWay = function(){
				$("#myModalIncorrect").modal();
			}

			// validamos que este en seleccionar caso
			if(window.location.hash.indexOf('simulacion/caso') >= 0){
				$scope.$parent.background = 'bg-simulation-02';

				// consultamos los casos
				API.call(
					'dicente/casos',
					'GET',
					{},
					function(response){
						if(response.status == "success"){
							$scope.cases = response.data.casos;
							setTimeout(function(){
								$('.nav.nav-tabs li').eq(0).find('a').click();
							}, 100);
						}else{
							$.notify('No se encontraron casos');
						}
					});


				// función que me muestra el caso
				$scope.seeCase = function(_case, i, $event){
					$('.tab-content > div').removeClass('active');
					$('#case' + (i + 1)).addClass('active');

					$scope.selectCase = _case;
				}

				// funcion que me envia a las instrucciones del caso
				$scope.selectCaseToSee = function(){
					// guardamos la información del caso en la sesión para luego obtener el tiempo
					$window.sessionStorage.dataCase = JSON.stringify($scope.selectCase);

					// eliminamos la variable si existe de leer el caso
					delete $window.sessionStorage.readCase;

					if($scope.selectCase.id == null || $scope.selectCase.id == undefined){ return; }

					// redireccionamos a las instrucciones del caso
					window.location = '#/simulacion/instrucciones/' + $scope.selectCase.id;
				}
			}

			// verificamos que estemos en las instrucciones
			if(window.location.hash.indexOf('instrucciones') >= 0){
				$scope.$parent.background = 'bg-simulation';
				// funcion que me envia a las instrucciones del caso
				$scope.startCase = function(){
					window.location = '#/simulacion/caso/leer';
				}	
			}

			// verificamos que este en el video correcto
			if(window.location.hash.indexOf('maneraCorrecta') >= 0){
				// consultamos el video correcto
				API.call(
					'dicente/videosustentacion?id=3',
					'GET',
					{},
					function(response){
						if(response.status == "success"){
							$scope.video = response.data;

							// organizamos el video
							$scope.video.enlace = $sce.trustAsResourceUrl($scope.video.enlace);
						}else{
							$.notify('No se encontraron casos');
						}
					});
			}

			// verificamos que este en el video incorrecto
			if(window.location.hash.indexOf('maneraIncorrecta') >= 0){
				// consultamos el video correcto
				API.call(
					'dicente/videosustentacion?id=6',
					'GET',
					{},
					function(response){
						if(response.status == "success"){
							$scope.video = response.data;

							// organizamos el video
							$scope.video.enlace = $sce.trustAsResourceUrl($scope.video.enlace);
						}else{
							$.notify('No se encontraron casos');
						}
					});
			}

			// verificamos que estemos en la pantalla de leer el caso
			if(window.location.hash.indexOf('leer') >= 0){
				$scope.$parent.background = 'bg-simulation';

				$scope.loadCorrectly = false;
				
				// variable que me controla si ya leyo el caso
				$scope.readCase = false;

				// obtenemos la informacion del caso
				$scope.selectCase = JSON.parse($window.sessionStorage.dataCase);

				// pasamos los minutos de la simulacion a segundo
				$scope.selectCase.tiempoPreparacion = parseInt($scope.selectCase.tiempoPreparacion) * 60;

				// validamos si ya leyo el caso
				if($window.sessionStorage.readCase != null){
					$scope.readCase = JSON.parse($window.sessionStorage.readCase);

					$("#myModal").modal({backdrop: 'static', keyboard: false});	                
				}else{
					// organizamos el video que se va a mostrar
					$scope.selectCase.documento = $scope.selectCase.documento.split('ejrlb.demostracionenlinea.com')[1];

					$scope.$on('timer-stopped', function (event, data){
						$("#myModal").modal({backdrop: 'static', keyboard: false}); // mostramos el modal y se le pasan los parametros para no poder cerrarlo
		                $scope.readCase = true;
		                $window.sessionStorage.readCase = JSON.stringify($scope.readCase);
		            });
					$scope.$on('timer-tick', function (event, data){
		                //console.log($scope.progressBar);
					});
				}

				// evento que muestra la sustentación
				$scope.goToLift = function(){
					$("#myModal").modal('hide'); // ocultamos el modal

					$scope.readCase = true;
	                $window.sessionStorage.readCase = JSON.stringify($scope.readCase);

					// se pone en un timeout para poder que cierre el modal
					$timeout(function(){
						// redireccionamos a las instrucciones del caso
						window.location = '#/simulacion/sustentacion/' + $scope.selectCase.id;
					},300);
				}

				window.loadPDF = function(){
				  /* have access to $scope here*/
				  $timeout(function(){
				  	$scope.loadCorrectly = true;
				  	console.log(':)');
				  },2000);
				}
			}

			// verificamos que este en la sustentacion
			if(window.location.hash.indexOf('sustentacion') >= 0){
				$scope.$parent.background = 'bg-simulation';

				// funcion que me muestra el modal de las herramientas
				$scope.seeTools = function(){
					// variable que guarda las herramientas
					$scope.toolsBox = [];

					// consultamos las cajas de herramienta
					API.call(
						'dicente/herramientas?id=2',
						'GET',
						{},
						function(response){
							$scope.toolsBox = response.data;
							$("#myModal").modal();
						});					
				}

				// funcion que nos dirige a grabar la sutentacion
				$scope.startRecordVideo = function(){
					window.location = '#/simulacion/caso/grabarVideo';
				}
			}

			// validamos que este en la url de grabar video
			if(window.location.hash.indexOf('grabarVideo') >= 0){
				$scope.$parent.background = 'bg-simulation';

				var bPreguntar = true;
     
			    window.onbeforeunload = preguntarAntesDeSalir;
			     
			    function preguntarAntesDeSalir()
			    {
			      if (bPreguntar)
			        return "¿Seguro que quieres salir?";
			    }

				// variable que controla cuando mostrar el boton de subir video
				$scope.completeRecord = false;

				// variable que controla que pantalla mostrar cuando se graba el audio
				$scope.stateAudio = true;

				$timeout(function(){

					$scope.player = videojs("myVideo",
					{
					    controls: true,
					    width: 320,
					    height: 240,
					    loop: true,
					    plugins: {
					        record: {
					            audio: true,
					            video: true,
					            maxLength: 1200,
					            debug: true,
					        }
					    }
					});

					//validamos si se inicializo el video
					if($('#myVideo > div').length == 0){
						$scope.player.recorder.destroy();
						$state.reload();
						$scope.$apply();
					}

					$timeout(function() {
						//$scope.player.recorder.reset();
					}, 300);

					// error handling
					$scope.player.on('deviceError', function()
					{
						alert("Recomendado usar como navegador mozilla firefox");
					    console.log('device error:', $scope.player.deviceErrorCode);
					});

					$scope.minutes = 0;
					// variable que maneja el estado de cuando mostrar la barra del tiempo
					$scope.startRecordVideoState = false;

					// user clicked the record button and started recording
					$scope.player.on('startRecord', function()
					{
						saveMinutes();
						$scope.startRecordVideoState = true;
					    console.log('started recording!');
					    $scope.$apply();
					});

					$scope.interval = null;
					$scope.view1Minute = false; // controla cuando mostrar la imagen de 1 minuto
					$scope.textVideo = 'Grabando...';

					function saveMinutes(){
						$scope.interval = setInterval(function(){
							$scope.minutes++;
							//console.log($scope.minutes);

							if($scope.minutes == 240){
								$scope.textVideo = 'Queda 1 minuto';
								$scope.$apply();
							}
							if($scope.minutes == 300){
								$scope.textVideo = 'Su tiempo ha terminado';
								$scope.$apply();
								clearInterval($scope.interval);
							}
						},1000);
					}

					// user completed recording and stream is available
					$scope.player.on('finishRecord', function()
					{
					    // the blob object contains the recorded data that
					    // can be downloaded by the user, stored on server etc.
					    console.log('finished recording: ', $scope.player.recordedData);

					    // ocultamos el boton para que vuelva a grabar 
					    $('.vjs-record-button').hide();

					    // mostramos el boton de subir archivo
					    $scope.completeRecord = true;

					    $scope.startRecordVideoState = false;

						clearInterval($scope.interval);
					    $scope.$apply();
					});
				},500);

				// evento que resetea el video
				$scope.restartVideo = function(){
					// resetiamos el video
					$scope.player.recorder.reset();

					// mostramos el boton para que vuelva a grabar 
				    $('.vjs-record-button').show();

				    $scope.startRecordVideoState = false;
				    $scope.stateAudio = true;
				    $scope.completeRecord = false;

					$scope.$parent.background = 'bg-simulation';

					$scope.dataOwl.trigger('destroy.owl.carousel');

					// mostramos el cargador
					/*$('.loader').fadeIn(300);

					setTimeout(function(){
						// ocultamos el cargador
						$('.loader').fadeOut(300);
					},500);*/
				}

				// función que me sube el audio al sistema
				$scope.uploadFileRecord = function(){

					// http://ejrlb.demostracionenlinea.com/servicios/v1/dicente/videodicente?dicente=&caso=
	            	var oData = new FormData($("#formUpload")[0]);
		            oData.append('video', $scope.player.recordedData);

		            var case_ = JSON.parse($window.sessionStorage.dataCase);

					// ajax que agrega un nuevo plan
					// $.ajax({
		                 //url: urlBack + "dicente/videodicente?dicente=1&caso=" + case_.id,
		                 //type: 'POST',
		                 //data: oData,
		                 //processData: false,
		                 //contentType : false,
		                 //success: function(response){
					 		// validamos que el estado halla sido correcto
		                     //if(response.status == 'success'){
		                         // mostramos el mensaje de exito
					 			//$('#btnUpload').notify('Audio subido correctamente', 'success');

					 			// guardamos el id del video subido en lawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww sesion
					 			//$window.sessionStorage.idAudioUploaded = response.data;

								// mostramos la otra pantalla
								$scope.stateAudio = false;

								$('.vjs-record-button').hide();

								$scope.startRecordVideoState = false;

								$scope.$parent.background = 'bg-simulation-slide';

								// mostramos el cargador
								//$('.loader').fadeIn(300);

								loadRubrics();
		                    //}else{
					 			//$('#btnUpload').notify('No se pudo subir el archivo!', 'error');
		                     //}
		                 //}
		             //})
		             //.fail(function(res) {
					 	//$('#btnUpload').notify("¡Error de Conexion, No se pudo subir el archivo!");
					 //});
				}
			}

			// validamos que este en la url de grabar video
			if(window.location.hash.indexOf('finSimulacion') >= 0){
				
				$scope.$parent.background = 'bg-simulation-03';

			}

			function loadRubrics(){
				// variable que guardara las rubricas
				$scope.rubrics = [];

				// variable que contendra toda la informacion de las rubricas
				$scope.arrayRubrics = [];

				$scope.dataOwl = null;

				setTimeout(function(){
					$scope.dataOwl = $('.owl-carousel');

					$scope.dataOwl.owlCarousel({
					    loop:false,
					    items:1,
					    autoHeight: true,
					    autoplay: false,
					    nav: true,
					    navText: ['<','>']
					});
				},500);

				// evento que valida cada accion de la rubrica
				$scope.validateSteps = function(position){
					if($scope.arrayRubrics[position].respuesta){					    
					    $scope.dataOwl.trigger('next.owl.carousel');
					}

				}
				$scope.endRubric = function(){
				    // recorremos todas las opciones de las rubricas para validar
				    angular.forEach($scope.arrayRubrics, function(value, key){
				    	if(value.respuesta == '' || value.respuesta == null || value.respuesta == undefined){
				    		value.respuesta == '0';
				    	}
				    });
					
					//console.log(JSON.parse($window.sessionStorage.dataCase));
				    // guardamos la información
				    API.call(
				    		'dicente/rubricasdicente?dicente=1&caso=' + JSON.parse($window.sessionStorage.dataCase).id,
				    		'POST',
				    		{
				    			respuestas: ($scope.arrayRubrics)
				    		},
				    		function(response){
				    			
				    			//console.log(response);
				    			if(response.status == "success"){
				    				//$.notify('Se envio la información correctamente ', 'info');

				    				window.location = "#/finSimulacion";
				    			}else{
				    				$.notify('No se pudo guardar la información');
				    			}
				    		}
				    	);
				}

				// consultamos las rubricas
				API.call(
					'dicente/rubricas',
					'GET',
					{},
					function(response){
						//console.log(response);
						if(response.status == "success"){
							$scope.rubrics = response.data;

							// creamos la referencia
							angular.forEach($scope.rubrics, function(value, key){
								$scope.arrayRubrics.push({ respuesta: '', id: value.id });
							});

							// ocultamos el cargador
							//$('.loader').fadeOut(300);
						}else{
							$.notify('No se encontraron rubricas');
						}
					});
			}
		}
	);
