app.controller('user-controller',['$scope', '$rootScope', 
																	'$state', 'UserService', 'AuthenticationService',
																function($scope, $rootScope, 
																				$state, UserService, AuthenticationService) {
	
	$scope.register_user = function(user) {
		if(user) {
			$scope.error = false;
			UserService.create(user,function(response, status) {
				if(status.success) {
					// $state.go('login')
					AuthenticationService.SetCredentials(response.data.email, response.data.auth_token)
					$state.go('home')
				} else {
					$scope.errors = response.data.errors
				}
			});
		} else {
			$scope.errors = false;
			$scope.error = "Please fill the form"
		}
	}
}])