app.factory('OrderService',['$rootScope', '$http', function($rootScope, $http) {

	var order = {}

	order.create = function(product_details, callback) {
		
		$http.post(__env.apiUrl + '/api/users/' + 
							$rootScope.globals.currentUser.user_id +'/orders', 
							{order: {product_and_quantity: product_details}})
					.then(function(data, status, headers, config) {
						callback(data, {success:true})
					})
					.catch(function(data, status, headers, config) {
						callback(data, {success:true})
					})			
	};

	order.show = function(order_id, callback) {
		
		$http.get(__env.apiUrl + '/api/users/' + 
							$rootScope.globals.currentUser.user_id +'/orders/' + order_id)
					.then(function(data, status, headers, config) {
						callback(data, {success:true})
					})
					.catch(function(data, status, headers, config) {
						callback(data, {success:true})
					})			
	};

	order.index = function(callback) {

		$http.get(__env.apiUrl + '/api/users/' + 
							$rootScope.globals.currentUser.user_id +'/orders')
					.then(function(data, status, headers, config) {
						callback(data, {success:true})
					})
					.catch(function(data, status, headers, config) {
						callback(data, {success:true})
					})			
	};

	return order
}])