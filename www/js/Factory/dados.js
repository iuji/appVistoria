angular.module('starter')


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
		}
		
	};
});