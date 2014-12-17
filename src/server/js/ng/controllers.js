(function(){
  'use strict';

  angular
    .module('app')
    .controller('Weather_Controller', Weather_Controller)
    ;

  function Weather_Controller(ForecastService){
    var vm = this;

    ForecastService.GetDailyForecast({}, function onSuccess(results){
      vm.weatherData = results;
      console.debug(results);
    }, function onError(err){

    });
  }
  Weather_Controller.$inject = ['ForecastService'];
})();