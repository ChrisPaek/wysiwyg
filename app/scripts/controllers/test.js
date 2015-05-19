'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('TestCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    interact('.drag-and-resize').draggable({
      snap: {
        targets: [
          { x: 100, y: 200 },
          function (x, y) { return { x: x % 20, y: y }; }
        ]}
    })
      .resizable({
        inertia: true
      });

    $scope.addButton = function(element){
      var but = angular.element('<button>new but</button>');
      element.append(but);
      $compile(but)($scope);
    };
  }
)

  .directive('draggable', function($document) {
    return function(scope, element, attr) {
      var startX = 0, /*startx/y in db*/ startY = 0, x = 0, y = 0;
      element.css({
        position: 'relative',
        border: '1px solid red',
        backgroundColor: 'lightgrey',
        cursor: 'pointer',
        display: 'block'
      });
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.screenX - x;
        startY = event.screenY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.screenY - startY;
        x = event.screenX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        console.log(x);
        console.log(y);
      }
    };
  })

  .directive('resizable', function($document) {
    return function(scope, element, attr) {

    };
      /*
      console.log(attr);
      console.log(element);
      var startZoom = 100, zoomX=100, zoomY=100, firstY= 0, firstX=0;
      element.css({
        'max-width': '100%',
        'max-height': '100%'
      });
      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        firstY = event.screenY;
        firstX = event.screenX;
        event.preventDefault();
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        //y = event.screenY - startY;
        //x = event.screenX - startX;
        zoomY = (zoomY + (event.screenY - firstY));
        zoomX = (zoomX + (event.screenX - firstX));
        element.css({
          width: zoomX + 'px',
          height: zoomY + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
        //console.log(x);
        //console.log(y);
      }
    };*/
  })

  .directive('resize', function($window) {

    return function(scope, element) {

      function applyHeight() {
        scope.height = $window.innerHeight;
        $('.gridStyle').height(scope.height - 100);
      }

      angular.element($window).bind('resize', function() {
        scope.$apply(function() {
          applyHeight();
        });
      });

      applyHeight();
    };
  })

  .directive('resizable2', function($window) {
  return function($scope) {
    $scope.initializeWindowSize = function() {
      $scope.windowHeight = $window.innerHeight;
      return $scope.windowWidth = $window.innerWidth;
    };
    $scope.initializeWindowSize();
    return angular.element($window).bind('resize', function() {
      $scope.initializeWindowSize();
      return $scope.$apply();
    });
  };
});;
