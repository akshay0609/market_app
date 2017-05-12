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

		service.SetCredentials = function(user_email,auth_token) {
        $rootScope.globals = {
        	currentUser: {
        		user_email: user_email,
        		auth_token: auth_token
        	}
        }

        $http.defaults.headers.common['Authentication'] = auth_token
        $cookieStore.put('globals', $rootScope.globals)
		}	

		service.clearCredentials = function() {
			$rootScope.globals = {}
			$cookieStore.remove('globals')
			$http.defaults.headers.common.Authentication = 'Basic'
		}

		return service
	}])