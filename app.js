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