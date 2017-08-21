// salvar imagem

angular.module("starter")
.factory("FileUtil", function($cordovaFile) {

	var util = {};
	util.filenames = [];
	util.images = [];
	
	function getNewName() {
		var today = new Date();
		//salva com a data atual
		//salva na pasta Android/data
		return today.getYear().toString()+"_"+today.getMonth().toString()+"_"+today.getDay().toString()+"_"+today.getHours().toString()+"_"+today.getMinutes().toString()+"_"+today.getSeconds().toString()+".jpg";
	}
	
	function saveFilenames(filenames){
		var lista = angular.toJson(filenames);
		localStorage.setItem("filenames", lista);
		alert(lista);
	}
	
	function loadFilenames(){
		var lista = localStorage.getItem("filenames");
		return angular.fromJson(lista) || [];
	}
	
	function openImage(name, success, folder) {
		$cordovaFile.readAsText(cordova.file.externalApplicationStorageDirectory+'/'+folder, name)
		.then(function(result) {
			//mostra a imagem
			success(result);
		},
		function(err) {
			console.log(err);
		})
	};
	
	util.load = function(folder){
		util.filenames = loadFilenames();
		for (var i = 0; i < util.filenames.length; i++) {
			openImage(util.filenames[i], function(dataUrl) {
				util.images.push(dataUrl);
			}, folder)
		}
	}
	
	
	
	util.save = function(dataUrl,folder){
		var name = getNewName();
		
		alert(folder);
		$cordovaFile.checkDir(cordova.file.externalApplicationStorageDirectory, folder).then(
			function (success) {
			// se existe a pasta, salvar a imagem dentro da pasta.
				$cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory+'/'+folder, name, dataUrl, true).then(
					function(result){
						console.log("sucesso");
						util.images.push(dataUrl);
						util.filenames.push(name);
						saveFilenames(util.filenames)
					},
					function(err){
						console.log("erro", err);
					}
				)	
			}, function (error) {
			// se não existe a pasta, criar a pasta.
				$cordovaFile.createDir(cordova.file.externalApplicationStorageDirectory, folder, false).then(
					function (success) {
					// depois de criado a pasta salvar a imagem dentro da pasta.
					$cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory+'/'+folder, name, dataUrl, true).then(
						function(result){
							console.log("sucesso");
							util.images.push(dataUrl);
							util.filenames.push(name);
							saveFilenames(util.filenames)
						},
						function(err){
							console.log("erro", err);
						}
					)
					
					}, function (error) {
						console.log("erro", error);
					});
			});
		
		
		
	};
	return util;

})