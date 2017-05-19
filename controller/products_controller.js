app.controller('products-controller',['$scope', '$http', '$q',function($scope, $http, $q) {

	$scope.submitProduct = function(product) {

		$http.post(__env.apiUrl + '/api/users/' + $rootScope.globals.id +'/products', 
							{product: product, images: $scope.images})

		.then(function(data) {
		})
		.error(function(data){
		})
	}
}]);