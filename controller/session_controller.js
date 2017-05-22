app.controller('session-controller',['$scope', '$state', 'AuthenticationService', 
																	function($scope, $state, AuthenticationService) {
	$scope.sign_in = function(){
		AuthenticationService.login($scope.user, function(response) {
			if (response.status == 200) {
				AuthenticationService.SetCredentials(response.data)
				$state.go('home')
			} else {
				$scope.errors = response.errors
			}
		})
	}
}]);