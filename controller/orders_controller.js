app.controller('orders-controller', ['$scope', '$rootScope', 'OrderService',
                                  'notificationService', '$stateParams', '$state',
																	function($scope, $rootScope, OrderService,
                                   notificationService, $stateParams, $state) {
  $scope.create_order = function() {
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

  $scope.index_orders = function() {
    OrderService.index(function(repsonse, status) {
      if(status.success) {
        $scope.orders = repsonse.data
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

}])