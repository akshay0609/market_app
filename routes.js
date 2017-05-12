app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: '/views/login.html',
			controller: 'session-controller'
		})
		.state('home', {
			url: '/home',
			templateUrl: '/views/home',
			controller: 'home-controller',
			data: {
        customData1: 44,
        customData2: "red"
    } 
		})
		.state('register', {
			url: '/register',
			templateUrl: '/views/register',
			controller: 'user-controller'
		});

		$urlRouterProvider.otherwise("home")
})
.run(['$rootScope','$cookieStore','$http','$state', '$location',
		function($rootScope, $cookieStore, $http, $state, $location) {

			$rootScope.globals = $cookieStore.get('globals') || {};
			if($rootScope.globals.currentUser) {
				$http.defaults.headers.common['Authentication'] = $rootScope.auth_token
			}

			// $rootScope.$on('$stateChangeStart', 
			// function(event, toState, toParams, fromState, fromParams, options){ 
			//     event.preventDefault(); 
			//     debugger	
			// })

			$rootScope.$on('$locationChangeStart', function (event, next, current) {
        if ($location.path() == '/home' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }

 	      if ($location.path() == '/login' && $rootScope.globals.currentUser) {
		      $location.path('/');
	      }
      });
		}])