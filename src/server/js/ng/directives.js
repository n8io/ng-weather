(function(){
  'use strict';

  angular
    .module('app.directives', [])
    .directive('weatherIcon', weatherIcon)
    ;


  /* @ngInject */
  function weatherIcon(IconService) {
    return {
      restrict: 'E',
      scope: {
        icon: '='
      },
      replace: true,
      template: '<canvas></canvas>',
      link: linkFn
    };

    function linkFn(scope, element, attrs){
      scope.$watch('icon', function onIconChange(newVal){
        if(!newVal) return;

        var ico = newVal.toUpperCase().split('-').join('_');

        if(!Skycons[ico]) return;

        IconService.remove(element[0]);
        IconService.add(element[0], Skycons[ico]);
        IconService.play();
      });
    }
  }
})();