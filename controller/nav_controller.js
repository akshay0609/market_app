app.controller('nav-controller', ['$scope', 'AuthenticationService',
																	'$state', function($scope, AuthenticationService, $state) {
	$scope.sign_out = function() {
		AuthenticationService.clearCredentials()
		$state.go('login')
	}
}])