(function(){
  'use strict';

  angular
    .module('app')
    .controller('Weather_Controller', Weather_Controller)
    ;

  function Weather_Controller($scope, ForecastService){
    var vm = this;

    vm.locations = [
      { label: 'Akron, OH', latLong: '41.0842,-81.5141' },
      { label: 'Atlanta, GA', latLong: '33.7483,-84.3911' },
      { label: 'Brussels, Belgium', latLong: '50.8484,4.3497' }
    ];

    $scope.$watch(function getSelectedLocation(){
      return vm.selectedLocation || vm.locations[0];
    }, function onWatchLocation(newValue){
      loadWeatherData();
    });

    vm.init = function init(){
      vm.selectedLocation = vm.locations[0];
      loadWeatherData();
    };

    vm.init();

    function loadWeatherData(){
      ForecastService.GetDailyForecast({latLong:vm.selectedLocation.latLong}, function onSuccess(results){
        vm.weatherData = results;
        console.debug(results);
      }, function onError(err){

      });
    }
  }
  Weather_Controller.$inject = ['$scope', 'ForecastService'];
})();