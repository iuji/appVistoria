// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic', 'starter.controllers', 'ngMask', 'ngCordova'])


// .run(function($ionicPlatform) {
	// $ionicPlatform.ready(function() {
    // // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // // for form inputs)
		// if (window.cordova && window.cordova.plugins.Keyboard) {
			// cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			// cordova.plugins.Keyboard.disableScroll(true);

		// }
		// if (window.StatusBar) {
		// // org.apache.cordova.statusbar required
			// StatusBar.styleDefault();
		// }
		
	// });
// })

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

    .state('identificacao', {
		url: '/identificacao',
		abstract: true,
		templateUrl: 'templates/identificacao.html'
	})
  
	.state('identificacao.identificacao', {
		url: '/identificacao',
        templateUrl: 'templates/identificacao.html'
	})
  
	.state('apartamento', {
		url: '/apartamento',
        templateUrl: 'templates/apartamento.html'
	})
  
	.state('casa', {
		url: '/casa',
		templateUrl: 'templates/casa.html'
	})
  
	.state('fotoPortao', {
		url: '/fotoPortao',
        templateUrl: 'templates/fotoPortao.html'
	})
	
	.state('fotoPorta', {
		url: '/fotoPorta',
        templateUrl: 'templates/fotoPorta.html'
	})
	
	
	
	.state('fotoCamera', {
		url: '/fotoCamera',
        templateUrl: 'templates/fotoCamera.html'
	})
	
	.state('fotoMicroondas', {
		url: '/fotoMicroondas',
        templateUrl: 'templates/fotoMicroondas.html'
	})
	
	.state('fotoSecadoura', {
		url: '/fotoSecadoura',
        templateUrl: 'templates/fotoSecadoura.html'
	})
	
	.state('fotoNotebook', {
		url: '/fotoNotebook',
        templateUrl: 'templates/fotoNotebook.html'
	})
	
	.state('fotoFilmadora', {
		url: '/fotoFilmadora',
        templateUrl: 'templates/fotoFilmadora.html'
	})
	
	.state('fotoCameraFotografica', {
		url: '/fotoCameraFotografica',
        templateUrl: 'templates/fotoCameraFotografica.html'
	})
	
	.state('fotoHomeTheater', {
		url: '/fotoHomeTheater',
        templateUrl: 'templates/fotoHomeTheater.html'
	})
	
	.state('fotoArCondicionado', {
		url: '/fotoArCondicionado',
        templateUrl: 'templates/fotoArCondicionado.html'
	})
	
	.state('fotoUmidificador', {
		url: '/fotoUmidificador',
        templateUrl: 'templates/fotoUmidificador.html'
	})
	
	.state('fotoAquecedor', {
		url: '/fotoAquecedor',
        templateUrl: 'templates/fotoAquecedor.html'
	})
	
	.state('fotoGeladeira', {
		url: '/fotoGeladeira',
        templateUrl: 'templates/fotoGeladeira.html'
	})
  
	.state('fotoFogao', {
		url: '/fotoFogao',
        templateUrl: 'templates/fotoFogao.html'
	})
	
	.state('fotoTelevisao', {
		url: '/fotoTelevisao',
        templateUrl: 'templates/fotoTelevisao.html'
	})
	
	.state('fotoMaquinaLavar', {
		url: '/fotoMaquinaLavar',
        templateUrl: 'templates/fotoMaquinaLavar.html'
	})
	
	.state('fotoComputador', {
		url: '/fotoComputador',
        templateUrl: 'templates/fotoComputador.html'
	})
  
	.state('obrigado', {
		url: '/obrigado',
        templateUrl: 'templates/obrigado.html'
	})
	
	.state('resumo', {
		url: '/resumo',
        templateUrl: 'templates/resumo.html'
	})


  
    .state('segurado', {
		url: '/segurado',
		templateUrl: 'templates/segurado.html'
    })

	.state('residencia', {
		url: '/residencia',
        templateUrl: 'templates/residencia.html'
	})
	
	.state('gps', {
		url: '/gps',
        templateUrl: 'templates/buscaGps.html'
	});
	
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/identificacao/identificacao');
	
});



