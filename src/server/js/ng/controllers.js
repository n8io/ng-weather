(function(){
  'use strict';

  angular
    .module('app')
    .controller('Master_Controller', Master_Controller)
    .controller('Body_Controller', Body_Controller)
    ;

  /* @ngInject */
  function Master_Controller($log){
    $log.log('Master_Controller loaded.');
  }
  /* @ngInject */
  function Body_Controller($log){
    $log.log('Body_Controller loaded.');
  }
})();