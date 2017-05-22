app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: '/views/login.html',
			controller: 'session-controller',
			public: true
		})
		.state('home', {
			url: '/home',
			templateUrl: '/views/home',
			controller: 'home-controller',
			public: true
		})
		.state('register', {
			url: '/register',
			templateUrl: '/views/register',
			controller: 'user-controller',
			public: true
		})
		.state('create_product', {
			url: '/product',
			templateUrl: '/views/product_form',
			controller: 'products-controller',
			public: false
		});

		$urlRouterProvider.otherwise("home")
})
.run(['$rootScope','$cookieStore','$http','$state', '$location',
		function($rootScope, $cookieStore, $http, $state, $location) {

			$rootScope.globals = $cookieStore.get('globals') || {};
			if($rootScope.globals.currentUser) {
				$http.defaults.headers.common['Authentication'] = $rootScope.globals.currentUser.auth_token
			}

			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        if (!toState.public && !$rootScope.globals.currentUser) {
          // $location.path('/login');
          event.preventDefault();
					$state.go('login');
        }

 	      if ((toState.url == '/login' || toState.url == '/register') && $rootScope.globals.currentUser) {
		      // $location.path(' home');
		       event.preventDefault();
					 $state.go('home');
	      }
			});
		}])