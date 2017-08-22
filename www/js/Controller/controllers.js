angular.module('starter.controllers', ['ionic','ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMask'])


.factory('dados', function($http){

    return {
		validaLogin:function(dados){
			return $http({
				        method: 'POST',
					    url: "http://localhost:9080/prjVistoria/login/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},
		imagem: {},
		buscaImagem:function(dados){
			return $http({
				        method: 'POST',
					    url: "http://localhost:9080/prjVistoria/buscaImagem/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},
		usuario: {},
		categoria: '',
		insertEnderecoVist:function(dados){
			return $http({
				        method: 'POST',
				        url: "http://localhost:9080/prjVistoria/insertEnderecoVist/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},
		updateItens:function(dados){
			return $http({
				        method: 'POST',
						url: "http://localhost:9080/prjVistoria/alteraItens/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},

		updateRotas:function(dados){
			return $http({
				        method: 'POST',
						url: "http://localhost:9080/prjVistoria/alteraRotas/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},

		updateDadosUsuario:function(dados){
			return $http({
				        method: 'POST',
						url: "http://localhost:9080/prjVistoria/alteraDadosUsuario/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},

		updateLocalizacao:function(dados){
			return $http({
				        method: 'POST',
						url: "http://localhost:9080/prjVistoria/alteraLocalizacao/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},
		buscaRotas:function(dados){
			return $http({
				        method: 'POST',
						url: "http://localhost:9080/prjVistoria/buscaRotas/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},
		updateImagens:function(dados){
			return $http({
				        method: 'POST',
						url: "http://localhost:9080/prjVistoria/alteraImagens/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		},

		updateVistoria:function(dados){
			return $http({
				        method: 'POST',
						url: "http://localhost:9080/prjVistoria/alteraVistoria/",
				        data: dados,
				        headers: {'Content-Type': 'application/json'}
				    });
		}



	};
})



.factory('paginacao', function($http){
    return {
		indexAtual: 0
	};
})

.controller('residenciaCtrl', function($scope, $http, dados, $ionicPopup){

		function alertaSegurado() {
		    var alertPopup = $ionicPopup.alert({
			  title: 'Falha ao confirmar endereço!',
			 template: 'Por favor, preencha todos os campos.'
		    })
		 }

		function alertaCepErrado() {
		    var alertPopup = $ionicPopup.alert({
			  title: 'CEP não encontrado!',
			 template: 'Por favor, digite um CEP válido.'
		    })
		 }

		function alertaServiçoCep() {
		    var alertPopup = $ionicPopup.alert({
			  title: 'Serviço indisponível!',
			 template: 'O Serviço de busca de CEP está indisponível, por favor digite os dados de endereço.'
		    })
		 }

    $scope.buscaCep = function(){
      var cep = $scope.enderecoVist.cep_vist.replace(/[\.-]/g, "");

      $http({
        method: 'GET',
        url: 'https://viacep.com.br/ws/'+cep+'/json/'
      })
        .then(function successCallback(response) {
          if(!response.data.erro){
            $scope.enderecoVist.logradouro_vist = response.data.logradouro;
            $scope.enderecoVist.bairro_vist = response.data.bairro;
            $scope.enderecoVist.cidade_vist = response.data.localidade;
          }
          else{
            alertaCepErrado();
          }
        }, function errorCallback(response) {
            alertaServiçoCep();
        });
    }

		$scope.insertEnderecoVist = function() {
      if ($scope.enderecoVistForm.$valid) {
				dados.categoria = $scope.enderecoVist.categoria;
        $scope.enderecoFinal = JSON.stringify($scope.enderecoVist);
        localStorage.setItem("enderecoVist", $scope.enderecoFinal);
        console.log("localStorage endereço: ",localStorage.enderecoVist);
        window.location.href = "#/gps";
			}else{
				alertaSegurado();
			}
		}
	this.dadosUsuario = dados.usuario;

})


.controller('checkboxCtrl', function($scope, $ionicPlatform, dados, paginacao, $location) {

	$ionicPlatform.ready(function() {
  	$scope.rotasSalvas = JSON.parse(localStorage.rotas);

    console.log("carregando rotas localStorage:", $scope.rotasSalvas);
  	$scope.indexAtual = paginacao.indexAtual;
  	$scope.nextPage = $scope.rotasSalvas[$scope.indexAtual];
    console.log("proxima pagina",$scope.nextPage);
	})

	$scope.addIndex = function(){
		if(paginacao.indexAtual == $scope.rotasSalvas.length){
			$location.path("/resumo");
		}
		else{
			paginacao.indexAtual = paginacao.indexAtual + 1;
			console.log("index atual:" + paginacao.indexAtual);
			$location.path($scope.nextPage);
		}
	}

})

.controller('alteraItensCtrl', function($scope, $http, dados, $ionicPopup){

	$scope.dadosUsuario = dados.usuario;
	$scope.alteraItens = function(){
	function alertaItens() {
		var alertPopup = $ionicPopup.alert({
		  title: 'Falha ao confirmar dados da residência!',
		 template: 'Por favor, preencha os campos obrigatórios corretamente!'
		})
	}

		if ($scope.itensVistForm.$valid) {

			$scope.selecionados = [];

			if($scope.itens.chk_camera != 2){
				$scope.selecionados.push("/fotoCamera")
			}
			if($scope.itens.chk_geladeira != 2){
				$scope.selecionados.push("/fotoGeladeira")
			}
			if($scope.itens.chk_fogao != 2){
				$scope.selecionados.push("/fotoFogao")
			}
			if($scope.itens.chk_microondas != 2){
				$scope.selecionados.push("/fotoMicroondas")
			}
			if($scope.itens.chk_maquinaLavar != 2){
				$scope.selecionados.push("/fotoMaquinaLavar")
			}
			 if($scope.itens.chk_secadoura != 2){
				$scope.selecionados.push("/fotoSecadoura")
			}
			 if($scope.itens.chk_computador != 2){
				$scope.selecionados.push("/fotoComputador")
			}
			 if($scope.itens.chk_notebook != 2){
				$scope.selecionados.push("/fotoNotebook")
			}
			 if($scope.itens.chk_filmadora != 2){
				$scope.selecionados.push("/fotoFilmadora")
			}
			 if($scope.itens.chk_cameraFotog != 2){
				$scope.selecionados.push("/fotoCameraFotografica")
			}
			 if($scope.itens.chk_televisao != 2){
				$scope.selecionados.push("/fotoTelevisao")
			}
			 if($scope.itens.chk_homeTheater != 2){
				$scope.selecionados.push("/fotoHomeTheater")
			}
			 if($scope.itens.chk_arCondic != 2){
				$scope.selecionados.push("/fotoArCondicionado")
			}
			 if($scope.itens.chk_umidificador != 2){
				$scope.selecionados.push("/fotoUmidificador")
			}
			 if($scope.itens.chk_aquecedor != 2){
				$scope.selecionados.push("/fotoAquecedor")
			}

				// CONVERTE A ARRAY NUMA STRING PARA PODER SALVAR NO BANCO
				$scope.dadoFinal = JSON.stringify($scope.selecionados);

				// IMPORTANTE PARA CONVERTER A STRING DE NOVO EM ARRAY
				// $scope.dadoErrado = JSON.parse($scope.dadoFinal);
        localStorage.setItem("rotas", $scope.dadoFinal)
        console.log("rotas localStorage:", localStorage.rotas);
        window.location.href = "#/fotoPorta";
		}else{
			alertaItens();
		}


	}
})


.controller('navegacaoCtrl', function($scope, $ionicHistory) {
	$scope.myGoBack = function() {
    $ionicHistory.goBack();
	};

	$scope.myGoBackFoto = function() {
	paginacao.indexAtual = paginacao.indexAtual + 1;
	console.log("index atual:" + paginacao.indexAtual);
    $ionicHistory.goBack();

	};
})



.controller('seguradoCtrl', function($scope, $http, dados, $ionicPopup) {
	function alertaSegurado() {
		var alertPopup = $ionicPopup.alert({
		  title: 'Falha ao confirmar endereço!',
		 template: 'Por favor, preencha os campos obrigatórios corretamente!'
		})
	}

	$scope.updateDadosUsuario = function(){
		if ($scope.seguradoForm.$valid) {
      localStorage.setItem("foneResidencial", $scope.user.foneResidencial);
      localStorage.setItem("foneCelular", $scope.user.foneCelular);
      localStorage.setItem("email", $scope.user.email);
      window.location.href = "#/residencia";
			// dados.updateDadosUsuario($scope.user)
			// 	.success(function (data, status) {
			// 		console.log(data);
			// 		window.location.href = "#/residencia";
      //
			// 	})
			// 	.error(function (data, status, headers, config) {
			// 		console.log(data,  status);
			// 		console.log("deu erro");
			// 	});
		}else{
			alertaSegurado();
		}
	}

  localStorage.setItem("nomeUsuario", 'Soraya Suzuki Tanikawa');
  localStorage.setItem("dtNascimento", '18/12/1985');
  localStorage.setItem("rg", '381435477');
  localStorage.setItem("orgaoEmissor", 'SSP');
  localStorage.setItem("logradouro_user", 'Alameda Rio Negro');
  localStorage.setItem("logradouro_user", 'Alameda Rio Negro');
  localStorage.setItem("numero_user", '585');
  localStorage.setItem("bairro_user", 'Alphaville ');
  localStorage.setItem("cidade_user", 'Barueri');
  localStorage.setItem("estado_user", 'SP');
  localStorage.setItem("foneResidencial", '11 2970-2076');
  localStorage.setItem("foneCelular", '11 96852-0247');
  localStorage.setItem("email", 'soraya.suzuki@gft.com');

  console.log(localStorage);
	$scope.dadosUsuario = localStorage;
	$scope.block = "readonly";

	$scope.alteraReadonly = function() {
		if($scope.block === "readonly"){
			$scope.block = "";

		}
		else {
			$scope.block = "readonly";
		}
	}


})

.controller('resumoCtrl', function($scope, $http, dados, $ionicPopup) {


	function alertaErro() {
		var alertPopup = $ionicPopup.alert({
		  title: 'Vistoria não realizada!',
		 template: 'Houve algum problema com a sua vistoria. Tente novamente!'
		})
	}

	$scope.dadosUsuario = [];
  $scope.dadosUsuario.nomeUsuario = localStorage.nomeUsuario;
  $scope.dadosUsuario.cpf = localStorage.cpf;
  $scope.dadosUsuario.email = localStorage.email;
  $scope.dadosUsuario.foneResidencial = localStorage.foneResidencial;
  $scope.dadosUsuario.foneCelular = localStorage.foneCelular;

	$scope.updateVistoria = function(){

			console.log($scope.dadosVistoria);
      window.location.href = "#/obrigado";

			// dados.updateVistoria($scope.dadosVistoria)
			// 	.success(function (data, status) {
			// 		console.log(data);
			// 		window.location.href = "#/obrigado";
			// 		console.log("resumo ok");
      //
			// 	})
			// 	.error(function (data, status, headers, config) {
			// 		console.log(data,  status);
			// 		console.log("deu erro");
			// 		alertaErro();
			// 	});
	}

})

.controller('identificacaoCtrl', function($scope, $http, dados, $ionicPopup) {

	function alertaLogin() {
	    var alertPopup = $ionicPopup.alert({
			title: 'Falha ao autenticar!',
			template: 'Por favor, certifique-se que digitou o CPF e o número da vistoria corretos.'
	    })
	}

  $scope.submitForm = function() {
    if ($scope.userForm.$valid) {
      console.log($scope.user);

      dados.validaLogin($scope.user).success(function (data, status, headers, config) {
        if(data !== "" ){
          window.location.href = "#/segurado";
      		dados.usuario = data;
      		$scope.dadosUsuario = dados.usuario;
        }
  			else{
          console.log("else");
  				alertaLogin();
  			}
			})
      .error(function (data, status, headers, config) {
				       	console.log(data,  status);
				       	console.log("deu erro");
                localStorage.setItem("cpf", $scope.user.cpf);
                localStorage.setItem("idVistoria", $scope.user.idVistoria);
                window.location.href = "#/segurado";
			});
		}
  };
})



.controller('mapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicPopup, dados) {


	$scope.categoriaEnd = dados.categoria;


	$scope.block = 1;

	$scope.salvarLocalizacao = function() {


		// $scope.longitudeVist = '-23.500628';
		// $scope.latitudeVist = '-46.848966';

		$scope.dadosLocalizacao = ({
			"latitude": $scope.latitudeVist,
			"longitude": $scope.longitudeVist,
			"idVistoria": dados.usuario.idVistoria
		});

		console.log($scope.dadosLocalizacao);

    		if ( $scope.categoriaEnd == 1 ) {
					window.location.href = "#/apartamento";
				}

				if ( $scope.categoriaEnd == 2 ) {
					window.location.href = "#/casa";
				}

		// dados.updateLocalizacao($scope.dadosLocalizacao)
		// 	.success(function (data, status) {
    //
		// 		if ( $scope.categoriaEnd == 1 ) {
		// 			window.location.href = "#/apartamento";
		// 		}
    //
		// 		if ( $scope.categoriaEnd == 2 ) {
		// 			window.location.href = "#/casa";
		// 		}
    //
    //
		// 		console.log("localizacao salvou");
		// 	})
		// 	.error(function (data, status, headers, config) {
		// 		 console.log(data,  status);
		// 		 console.log("localizacao não salvou");
		// 	});
	}

	function alertaGps() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Falha ao buscar sua localização.',
		 template: 'Por favor, certifique que sua localização encontra-se habilitada!'
	   })
	}



    $scope.reload = function() {

        $ionicLoading.show({
			template: '<ion-spinner icon="ios"></ion-spinner><br/>Buscando localização...'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            var myLatlng = new google.maps.LatLng(lat, long);

            var mapOptions = {
                center: myLatlng,
        				draggable: false,
        				disableDoubleClickZoom: true,
        				streetViewControl: false,
                zoom: 16,
        				zoomControl: false,
        				panControl: false,
        				mapMaker: false,
        				keyboardShortcuts: false,
        				overviewMapControl: false,
        				mapTypeControl: false,
        				rotateControl: false,
        				scaleControl: false,
        				scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			          marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                draggable:false
			});
            $scope.map = map;
            $ionicLoading.hide();
      			$scope.isDisabled = false;
      			$scope.block = 2;

        }, function(err) {
			      $scope.block = 1;
            $ionicLoading.hide();
            alertaGps();
			      console.log('desabilita');
        })
    }

    $ionicPlatform.ready(function() {


        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br/>Buscando localização...'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            var myLatlng = new google.maps.LatLng(lat, long);

            var mapOptions = {
                center: myLatlng,
        				draggable: false,
        				disableDoubleClickZoom: true,
        				streetViewControl: false,
                zoom: 16,
        				zoomControl: false,
        				panControl: false,
        				mapMaker: false,
        				keyboardShortcuts: false,
        				overviewMapControl: false,
        				mapTypeControl: false,
        				rotateControl: false,
        				scaleControl: false,
        				scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			          marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                draggable:false
			});

            $scope.map = map;
            $ionicLoading.hide();

			$scope.isDisabled = false;
			$scope.block = 2;

			// pega a latitude e longitude
			$scope.latitudeVist = lat;
			$scope.longitudeVist = long;


        }, function(err) {

			$scope.block = 1;

            $ionicLoading.hide();
            alertaGps();

			console.log('desabilita');

        });
    });
})






.controller('fotosCtrl', function($scope, dados, $ionicPlatform, ImageUtil, FileUtil, $ionicModal, $ionicPopup, $cordovaCamera) {
	$scope.imageCamera = undefined;

  function alertaTirarFoto() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Tire uma foto.',
		 template: 'Neste momento será iniciado a câmera para o usuário tirar a foto.'
	   })
	}

  function alertaEscolherFoto() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Escolha uma foto do album',
		 template: 'Neste momento irá abrir a galeria para o usuário escolher a foto.'
	   })
	}

	$scope.onClickC = function(){
    alertaTirarFoto();
	}

	$scope.onClickG = function() {
    alertaEscolherFoto();
  }

	$scope.imagemBd = undefined;

	$scope.buscaImagemBd = function() {
		if(localStorage.foto !== undefined) {
			$scope.imagemBd = localStorage.foto;
			console.log($scope.imagemBd);
			console.log("deu certo");
		}
		else {
			console.log("sem retorno do bd");
		}
	}


	$scope.salvarImagens = function() {
    localStorage.setItem("foto", $scope.imageCamera);
    $scope.buscaImagemBd();
	}
})
