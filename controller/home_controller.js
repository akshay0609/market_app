app.controller('home-controller',['$scope', '$rootScope', 
							'$state','AuthenticationService',
							 function($scope, $rootScope, $state, AuthenticationService) {
	
$scope.images = [
    {
      image: 'http://i01.appmifile.com/webfile/globalimg/en/goods/redmi4a/index-bg-new.jpg'
    },
    {
      image: 'http://www.tclindia.co.in/wp-content/uploads/2017/02/Artboard-1.png'
    },
    {
      image: 'http://www.inus.us/includes/templates/inus/images/puma_banner.jpg'
    },
    {
      image: 'https://files.pccasegear.com/UserFiles/WDBBKD0030BBK-PESN-banner.jpg'
    }
  ];

	$scope.home = $rootScope.login

}]);