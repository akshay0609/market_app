app.controller('products-controller',['$scope', '$http', '$q', 
																			'$rootScope', 'notificationService', 
																			'ProductService', '$stateParams',
																			function($scope, $http, $q, 
																			$rootScope,notificationService, 
																			ProductService, $stateParams) {

	$scope.product = {}
	$scope.products = []
	$scope.addsImages = [];
	$rootScope.cart_product = $rootScope.cart_product || [];;
	$scope.myInterval = 500;
  $scope.noWrapSlides = false;
  $scope.active = 0;

	$scope.submitProduct = function() {
		if (Object.keys($scope.product).length) { 		
			ProductService.create($scope.product, $scope.images, function(data, status) {
				if(status.success) {
					$scope.product = {}
					$scope.images = []
					notificationService.success('Product Stored Successfully');
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
		  images.push(__env.apiUrl + value.name.url);
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
		ProductService.index(10, function(response, status) {
			if(status.success) {
				$scope.products = response.data
			} else {
				notificationService.error('Internal Problem please try again');
			}
		})
	}

	product_index = function() {
		$scope.products = [];
		ProductService.index('',function(response, status) {
			if(status.success) {
				$scope.products = response.data
			} else {
				notificationService.error('Internal Problem please try again');
			}
		})
	}

	$scope.add_to_cart = function(product){
		if(product.quantity == 0) {
			notificationService.error('Soon Products will be added');
		} else {
			var index = product_exists_in_cart(product.id)
			if(index > -1) {
				// yes
				product.quantity = product.quantity - 1
				$rootScope.cart_product[index].cart_quantity = $rootScope.cart_product[index].cart_quantity + 1
			} else {
				// no
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

	$scope.Total = 0;

	$scope.updateAmount = function() {
		$scope.Total = 0
		angular.forEach($rootScope.cart_product,function(products) {
			$scope.Total = $scope.Total + products.product.price * products.cart_quantity
		});
	}

	$scope.removeProduct = function(product) {
		var index = $rootScope.cart_product.indexOf(product);
  	$rootScope.cart_product.splice(index, 1);   
  	$scope.updateAmount()
	}

	$scope.init_products = function() {
		product_index();
	}

	$scope.init = function() {
		product_suggestions()
		product_show()
	};
}]);