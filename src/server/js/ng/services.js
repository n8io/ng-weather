(function(){
  'use strict';

  angular
    .module('app.services', ['ngResource'])
    .service('IconService', IconService)
    .service('ForecastService', ForecastService)
    ;

  function IconService(){
    return new Skycons();
  }

  function ForecastService($resource){
    return $resource(
      '/api/weather',
      {},
      {
        GetDailyForecast: {
          method: 'get',
          array: false
        }
      }
    );
  }
  ForecastService.$inject = ['$resource'];
})();