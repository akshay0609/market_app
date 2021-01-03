app.controller('home-controller',['$scope', '$rootScope', 
							'$state','AuthenticationService', 'ProductService',
							 function($scope, $rootScope, $state, AuthenticationService, ProductService) {
	
  $scope.images = [
      {
        name: "Mobiles",
        image: 'https://res.cloudinary.com/dzrgwhm1s/image/upload/v1609568563/public/market-app/index-bg-new.jpg'
      },
      {
        name: "Games",
        image: 'https://res.cloudinary.com/dzrgwhm1s/image/upload/v1609569026/public/market-app/wp3025432.jpg'
      },
      {
        name: "Camera",
        image: 'https://res.cloudinary.com/dzrgwhm1s/image/upload/v1609572029/public/market-app/48-485878_camera-wallpapers-hd.jpg'
      },
      {
        name: "Hard Drives",
        image: 'https://res.cloudinary.com/dzrgwhm1s/image/upload/v1609568909/public/market-app/WDBBKD0030BBK-PESN-banner.jpg'
      }
    ];

  $scope.home = $rootScope.login

  $scope.apis_up = function() {
    product_index({limit: 1})
  }

  // For Product Call to up the heroku APIs
  product_index = function(product_params) {
    ProductService.index(product_params, function(response, status) {
      if(status.success) {
        console.log("successfully connected to server")
      }
    })
  }
}]);