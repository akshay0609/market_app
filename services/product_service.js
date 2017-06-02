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

	product.show = function(product_id, callback) {
		$http.get(__env.apiUrl + '/api/products/' + product_id)
			.then(function(data, status, headers, config) {
				callback(data, {success:true})
			}).catch(function(data, status, headers, config) {
				callback(data, {success:false})
			})
	}

	product.index = function(limit, callback) {
		limit = limit || ''
		$http.get(__env.apiUrl + '/api/products/', {limit: limit})
			.then(function(data, status, headers, config) {
				callback(data, {success:true})
			}).catch(function(data, status, headers, config) {
				callback(data, {success:false})
			})
	}

	return product
}])