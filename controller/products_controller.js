app.controller('products-controller',['$scope', '$http', '$q', 
																			'$rootScope', 'notificationService', 
																			'ProductService', '$stateParams',
																			 '$location',  '$state',
																			function($scope, $http, $q, 
																			$rootScope,notificationService, 
																			ProductService, $stateParams, 
																			$location, $state ) {

	$scope.product = {}
	$scope.products = []
	$scope.addsImages = [];
	$rootScope.cart_product = $rootScope.cart_product || [];;
	$scope.myInterval = 2000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.currentPageProduct  = 1
  $scope.maxSizeProduct      = 8

	$scope.submitProduct = function() {
		if (Object.keys($scope.product).length) { 		
			ProductService.create($scope.product, $scope.images, function(response, status) {
				if(status.success) {
					$scope.product = {}
					$scope.images = []
					notificationService.success('Product Stored Successfully');
					$state.go('show_product', {'id': response.data.id})
				} else {
					notificationService.error('Internal Problem please try again');
				}
			})	
		}	
	}

	$scope.reset = function() {
		$scope.product = {}
		$scope.images = []
	}

	full_image_url = function(data, images) {
		angular.forEach(data.pictures, function(value) {
		  images.push(value.name.url);
		});
	}

	product_show = function() {
		$scope.images = []
		ProductService.show($stateParams.id, function(response, status) {
			if(status.success) {
				full_image_url(response.data, $scope.images)	
				$scope.product = response.data
			} else {
				notificationService.error('Internal Problem please try again');
			}
		})
	}

	product_suggestions = function() {
		$scope.products = [];
		$scope.addsImages = [];
		product_index({limit: 10})
	}

	product_index = function(product_params) {
		$scope.products = [];
		ProductService.index(product_params, function(response, status) {
			if(status.success) {
				$scope.products 		= response.data
				$scope.totalItemsProduct   = response.data[0].total_product
			} else {
				notificationService.notice('No Product Found');
			}
		})
	}

	$scope.add_to_cart = function(product){
		if(product.quantity == 0) {
			notificationService.error('Soon Products will be added');
		} else {
			var index = product_exists_in_cart(product.id)
			if(index > -1) {
				product.quantity = product.quantity - 1
				$rootScope.cart_product[index].cart_quantity = $rootScope.cart_product[index].cart_quantity + 1
			} else {
				product.quantity = product.quantity - 1
				$rootScope.cart_product.push({
					product: product,
					cart_quantity: 1
				});
			}
			notificationService.info(product.title + ' Successfully Added in cart');
		}
	}

	product_exists_in_cart = function(product_id) {
		var found_index = -1
		angular.forEach($rootScope.cart_product, function(cart_product, index) {
		  if(cart_product.product.id == product_id) {
		  	found_index = index
		  }
		});
		return found_index
	}

	$scope.init_products = function() {
		$scope.currentPageProduct  = 1
  	$scope.maxSizeProduct      = 8
		var product_params = {page: 1, per_page: __env.per_page_product}
		if($stateParams.product_search) {
			angular.merge(product_params,{title: $stateParams.product_search});
		}
		product_index(product_params);
	}

	$scope.init = function() {
		product_suggestions()
		product_show()
		disqus_comments()
	};

	$scope.pageChangedProduct = function(page) {
		var product_params = {page: page, per_page: __env.per_page_product}
		if($stateParams.product_search) {
			angular.merge(product_params,{title: $stateParams.product_search});
		}
    product_index(product_params)
  };

  $scope.filter_by_price = function(price_min_and_max) {
  	$scope.currentPageProduct  = 1
  	$scope.maxSizeProduct      = 8
  	angular.merge(price_min_and_max, {page: 1, per_page: __env.per_page_product});
  	if($stateParams.product_search) {
			angular.merge(price_min_and_max,{title: $stateParams.product_search});
		}
  	product_index(price_min_and_max)
  }

  $scope.filter_by_order = function(order_by) {
  	$scope.currentPageProduct  = 1
  	$scope.maxSizeProduct      = 8
  	angular.merge(order_by, {page: 1, per_page: __env.per_page_product});
  	if($stateParams.product_search) {
			angular.merge(order_by,{title: $stateParams.product_search});
		}
  	product_index(order_by)
  }

  var disqus_comments_config = function() {
		window.disqus_config = function () {
			this.page.url = $location.absurl;
			this.page.identifier = $stateParams.id;
		};	
	}

	var disqus_comments = function() {
		disqus_comments_config()

		var d = document, s = d.createElement('script');
	  s.src = __env.disqusUrl;
	  s.setAttribute('data-timestamp', +new Date());
	  (d.head || d.body).appendChild(s);
	}

}]);