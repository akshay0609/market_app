app.controller('orders-controller', ['$scope', '$rootScope', 'OrderService',
                                  'notificationService', '$stateParams', '$state',
																	function($scope, $rootScope, OrderService,
                                   notificationService, $stateParams, $state) {

  $scope.currentPage  = 1
  $scope.maxSize      = 6

  $scope.create_order = function() {
    if($rootScope.globals.currentUser) {
    	var product_details = format_product_details()
    	OrderService.create(product_details, function(repsonse, status) {
    		if(status.success) {
    			notificationService.success('Successfully place your order please check your mail');
          $rootScope.cart_product = []
          $state.go('show_orders',{'id': repsonse.data.id})
    		} else {
    			notificationService.error('Internal problem occure please try again later');
    		}
    	})
    } else {
      notificationService.error('Before place order please login');
      $state.go('login');
    }
  }

  $scope.show_order = function() {
    OrderService.show($stateParams.id, function(repsonse, status) {
      if(status.success) {
        $scope.order = repsonse.data
      } else {
        notificationService.error('Internal problem occure please try again later');
      }
    });
  }

  $scope.pageChanged = function(page) {
    $scope.index_orders(page)
  };

  $scope.index_orders = function(page_no) {
    page = page_no || 1
    OrderService.index(page, function(repsonse, status) {
      if(status.success) {
        $scope.totalItems   = repsonse.data[0].total_orders
        $scope.orders       = repsonse.data
      } else {
        notificationService.error('Internal problem occure please try again later');
      }
    });
  }

  format_product_details = function() {
  	var product_details = []
  	angular.forEach($rootScope.cart_product, function(products) {
  		product_details.push([products.product.id, products.cart_quantity])
		});
		return product_details
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

}])