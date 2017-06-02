app.controller('session-controller',['$scope', '$state', 'AuthenticationService', '$rootScope',
																	function($scope, $state, AuthenticationService, $rootScope) {
	$scope.sign_in = function(){
		$rootScope.beforeLoginUrl = $rootScope.beforeLoginUrl || 'home'
		AuthenticationService.login($scope.user, function(response) {
			if (response.status == 200) {
				AuthenticationService.SetCredentials(response.data)
				$state.go($rootScope.beforeLoginUrl)
			} else {
				$scope.errors = response.errors
			}
		})
	}
}]);