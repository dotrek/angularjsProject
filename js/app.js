'use strict';

var $apiEndpoint  = 'https://api.themoviedb.org/3/',
    $apiKey = 'b7730d1a414288518756be8dd8f01947',
    $error_noData = 'Uups! No connection to the database.'

// Angular App
var movieApp = angular.module( 'movieApp', ['ngRoute', 'ngAnimate'] );

// Configuration and routing
movieApp
  .config( ['$httpProvider',
    function ($httpProvider) {

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }
  ])
  .config( ['$routeProvider',
    function ($routeProvider) {

      $routeProvider
        .when( '/:page', {
          controller: 'listController',
          templateUrl: 'js/views/main.html'
        })
        .when('/movies/:movieId', {
          controller: 'singleController',
          templateUrl: 'js/views/single.html'
        })

      $routeProvider.otherwise( {'redirectTo': '/#/'} );
    }
  ]);


// jQuery
(function($){
  'use strict';

  // Change navbar opacity on scroll
  $(window).scroll( function( event ) {

    var $nav = $('#main-navbar');
    if ( $(document).scrollTop() > 50 ) {
      $nav
        .addClass('scrolled');
    } else {
      $nav
        .removeClass('scrolled');
    }

  });

  // more

})(jQuery);
