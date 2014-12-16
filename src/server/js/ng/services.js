(function(){
  'use strict';
  
  angular
    .module('app')
    .service('TestService', TestService);
  
  /* @ngInject */
  function TestService($resource, APP_CONSTANTS){
    return $resource(
      APP_CONSTANTS.testJsonUri, // svc url
      {}, // parameters
      { 
        // methods
        Get: {
          method: 'GET',
          isArray: true
        }
      }
    );
  }
})();