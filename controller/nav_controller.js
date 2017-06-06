app.controller('nav-controller', ['$scope', 'AuthenticationService', 
																	'$state', '$rootScope', function($scope, AuthenticationService, 
																	$state, $rootScope) {
	$scope.sign_out = function() {
		AuthenticationService.clearCredentials()
		$state.go('login')
	}

	$scope.search_product = function(search_text) {
	}
}])