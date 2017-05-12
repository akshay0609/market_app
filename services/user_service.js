app.factory('UserService',['$http', '$rootScope', 
														function($http, $rootScope) {
	var user = {}

	user.create = function(user, callback) {
		$http.post(__env.apiUrl + '/api/users', {user: user})
			.then(function(data, status, headers, config) {
				callback(data, {success:true})
			}).catch(function(data, status, headers, config) {
				callback(data, {success:false})
			})
	}

	return user
}])