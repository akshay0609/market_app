app.controller('home-controller',['$scope', '$rootScope', 
							'$state','AuthenticationService',
							 function($scope, $rootScope, $state, AuthenticationService) {
	

$scope.images = [
    {
      image: 'https://placehold.it/1300x400?text=IMAGE1'
    },
    {
      image: 'https://placehold.it/1300x400?text=IMAGE1'
    },
    {
      image: 'https://placehold.it/1300x400?text=IMAGE1'
    },
    {
      image: 'https://placehold.it/1300x400?text=IMAGE1'
    }
  ];

	$scope.home = $rootScope.login

	$scope.sign_out = function() {
		AuthenticationService.clearCredentials()
		$state.go('login')
	}
}]);