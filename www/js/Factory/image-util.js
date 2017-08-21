angular.module('starter')
.factory("ImageUtil", function($cordovaCamera) {
	var util = {};
	
	util.cameraOptions = {
		CAMERA: 1,
		GALLERY: 1 //2
	} 
		
	util.getImage = function(option, success, error) {
		//atributos da foto
		
		var options = {
		  quality: 100,
		  destinationType: Camera.DestinationType.DATA_URL,
		  sourceType: option,
		  allowEdit: false,
		  encodingType: Camera.EncodingType.JPEG,
		  targetWidth: 600,
		  targetHeight: 800,
		  cameraDirection: 0,
		  popoverOptions: CameraPopoverOptions,
		  saveToPhotoAlbum: true,
		  correctOrientation: true
		};

		//pega a imagem
		$cordovaCamera.getPicture(options)
			.then(function(imageData) {
				success(imageData);
			}, function(err) {
				error(err);
			});
		
	};
	
	return util;
	
})