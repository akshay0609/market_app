var app = angular.module('marketApp', ['ui.router','ngCookies',
																				'ui.router.state.events',
																				'naif.base64','ui.bootstrap',
																				'jlareau.pnotify', 'ui.toggle',
																				'ngSanitize'
																				])

	 .value('HTMLIZE_CONVERSIONS', [
    { expr: /\n+?/g, value: '<br>' }
  ])
  
  .filter('htmlize', function(HTMLIZE_CONVERSIONS) {
    return function(string) {
      return HTMLIZE_CONVERSIONS.reduce(function(result, conversion) {
        return result.replace(conversion.expr, conversion.value);
      }, string || '');
    };
  });

  app.config(function ($httpProvider, $provide) {
    $provide.factory('httpInterceptor', function ($q, $rootScope) {
        return {
            'request': function (config) {
                // intercept and change config: e.g. change the URL
                // config.url += '?nocache=' + (new Date()).getTime();
                // broadcasting 'httpRequest' event
                //   $rootScope.$broadcast('httpRequest', config);
                $rootScope.active = true;
                return config || $q.when(config);
            },
            'response': function (response) {
                // we can intercept and change response here...
                // broadcasting 'httpResponse' event
                $rootScope.active = false;
                // $rootScope.$broadcast('httpResponse', response);
                return response || $q.when(response);
            },
            'requestError': function (rejection) {
                // broadcasting 'httpRequestError' event
                    $rootScope.active = false;
                // $rootScope.$broadcast('httpRequestError', rejection);
                return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                // broadcasting 'httpResponseError' event
                $rootScope.active = false;
                $rootScope.$broadcast('httpResponseError', rejection);
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('httpInterceptor');
});