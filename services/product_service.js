app.factory('ProductService',['$http', '$rootScope', 
														function($http, $rootScope) {
	var product = {}

	product.create = function(product, images, callback) {
		$http.post(__env.apiUrl + '/api/users/' + $rootScope.globals.currentUser.user_id +'/products', 
							{product: product, images: images})
			.then(function(data, status, headers, config) {
				callback(data, {success:true})
			}).catch(function(data, status, headers, config) {
				callback(data, {success:false})
			})
	}

	return product
}])