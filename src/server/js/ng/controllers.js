(function(){
  'use strict';

  angular
    .module('app')
    .controller('Master_Controller', Master_Controller)
    .controller('Weather_Controller', Weather_Controller)
    ;

  /* @ngInject */
  function Master_Controller($log){
    $log.log('Master_Controller loaded.');
  }
  /* @ngInject */
  function Weather_Controller(ForecastService){
    var vm = this;

    ForecastService.GetForecast({}, function onSuccess(results){
      vm.weather = results;
      console.log(results);
    });
  }
})();