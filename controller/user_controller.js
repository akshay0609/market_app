app.controller('user-controller',['$scope', '$rootScope', 
																	'$state', 'UserService', 'AuthenticationService',
																	'notificationService',
																function($scope, $rootScope, 
																				$state, UserService, AuthenticationService,
																				notificationService) {
	
	$scope.user = {}												

	$scope.register_user = function() {
		if($scope.user) {
			$scope.error = false;
			UserService.create($scope.user,function(response, status) {
				if(status.success) {
					// $state.go('login')
					AuthenticationService.SetCredentials(response.data)
					notificationService.success('Account Created Successfully');
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

	$scope.$on('edit_profile', function() {
		$scope.button_name = "Update"
		UserService.edit($rootScope.globals.currentUser.user_id, function(response, status) {
			$scope.user = {}
			if(status.success) {
				$scope.user = response.data
			} else {
				$scope.error = "Please fill the form"
				$state.go('home')
			}
		});
	});

	$scope.update_profile = function() {
		if($scope.user) {
			$scope.error = false;
			UserService.update($scope.user,function(response, status) {
				if(status.success) {
					// $state.go('login')
					AuthenticationService.clearCredentials()
					AuthenticationService.SetCredentials(response.data)
					notificationService.success('Account Updated Successfully');
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