(function(){
  'use strict';
  
  angular
    .module('app')
    .constant('APP_CONSTANTS',{
      testJsonUri: 'http://jsonplaceholder.typicode.com/users'
    });
})();