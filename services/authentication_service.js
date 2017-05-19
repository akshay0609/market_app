app.factory("AuthenticationService", 
	['$http', '$cookieStore', '$rootScope',
	function($http, $cookieStore, $rootScope) {
		var service = {}

		service.login = function(user, callback) {
			
			var onSuccess = function(response, status, headers, config) {
				callback(response)
			}

			var onError = function(response, status, headers, config) {
				callback(response);
			}
			
			$http.post(__env.apiUrl + '/api/sessions',{session: user})
				.then(onSuccess)
				.catch(onError);
			}

		service.SetCredentials = function(user) {
        $rootScope.globals = {
      		currentUser: {
      			user_id: user.id,
	      		user_email: user.email,
	      		user_name: user.name,
	      		auth_token: user.auth_token
	      	}
        }

        $http.defaults.headers.common['Authentication'] = user.auth_token
        $cookieStore.put('globals', $rootScope.globals)
		}	

		service.clearCredentials = function() {
			$rootScope.globals = {}
			$cookieStore.remove('globals')
			$http.defaults.headers.common.Authentication = 'Basic'
		}

		return service
	}])