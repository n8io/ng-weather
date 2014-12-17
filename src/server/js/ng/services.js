(function(){
  'use strict';

  angular
    .module('app')
    .service('IconService', IconService)
    .service('ForecastService', ForecastService)
    ;

  /* ngInject */
  function IconService(){
    return new Skycons();
  }

  /* @ngInject */
  function ForecastService($resource, APP_CONSTANTS){
    return $resource(
      '/api/weather', // svc url
      {}, // parameters
      {
        // methods
        GetForecast: {
          method: 'GET',
          isArray: false
        }
      }
    );
  }
})();