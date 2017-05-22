app.controller('products-controller',['$scope', '$http', '$q', 
																			'$rootScope', 'notificationService', 'ProductService',
																			function($scope, $http, $q, $rootScope,notificationService, ProductService) {

	$scope.product = {}

	$scope.submitProduct = function() {

		if (Object.keys($scope.product).length) { 		
			ProductService.create($scope.product, $scope.images, function(data, status) {
				if(status.success) {
					$scope.product = {}
					$scope.images = []
					notificationService.success('Product Stored Successfully');
				} else {
					$scope.product = {}
					$scope.images = []
					notificationService.error('Internal Problem please try again');
				}
			})	
		}	
	}

	$scope.reset = function() {
		$scope.product = {}
		$scope.images = []
	}
}]);