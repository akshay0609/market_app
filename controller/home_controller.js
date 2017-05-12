app.controller('home-controller',['$scope', '$rootScope', 
							'$state','AuthenticationService',
							 function($scope, $rootScope, $state, AuthenticationService) {
	
	$scope.home = $rootScope.login

	$scope.sign_out = function() {
		AuthenticationService.clearCredentials()
		$state.go('login')
	}
}]);