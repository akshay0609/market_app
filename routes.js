app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: '/views/login.html',
			controller: 'session-controller',
			// resolve:{
			//  	button_name: "Register"
			// },
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
		.state('edit_profile', {
			url: '/edit-profile',
			templateUrl: '/views/register',
			controller: 'user-controller',
			onEnter: function($rootScope, $timeout) {
        $timeout(function() {
        	$rootScope.active = true;
        }, 200);
        $timeout(function() {
          $rootScope.$broadcast('edit_profile');
        }, 1000)
    	},
			public: true
		})
		.state('create_product', {
			url: '/product',
			templateUrl: '/views/product_form',
			controller: 'products-controller',
			public: false
		})
		.state('show_product', {
			url: '/product-show/:id',
			templateUrl: '/views/product_show',
			controller: 'products-controller',
			public: true
		})
		.state('index_product', {
			url: '/products',
			templateUrl: '/views/products_index',
			controller: 'products-controller',
			public: true
		})
		.state('product_order', {
			url: '/carts',
			templateUrl: '/views/cart.html',
			controller: 'orders-controller',
			public: true
		})
		.state('show_orders', {
			url: '/order/:id',
			templateUrl: '/views/order_show.html',
			controller: 'orders-controller',
			public: true
		})
		.state('index_order', {
			url: '/orders',
			templateUrl: '/views/order.html',
			controller: 'orders-controller',
			public: true
		})
		.state('payment', {
			url: '/payment',
			templateUrl: '/views/payment.html',
			controller: 'orders-controller',
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
        $rootScope.active = true;
        if (!toState.public && !$rootScope.globals.currentUser) {
          // $location.path('/login');
          event.preventDefault();
					$rootScope.beforeLoginUrl = toState.name
					$state.go('login');
        }

 	      if ((toState.url == '/login' || toState.url == '/register') && $rootScope.globals.currentUser) {
		      // $location.path(' home');
		       $rootScope.beforeLoginUrl = $rootScope.beforeLoginUrl || ''
		       event.preventDefault();
					 $state.go($rootScope.beforeLoginUrl);
	      }
			});

			$rootScope.$on('$viewContentLoaded', function(event){ 
				$rootScope.active = false; 
			});
		}])