// Generated by CoffeeScript 1.6.2
(function() {
  require.config({
    baseUrl: 'static/js/lib/',
    paths: {
      vendor: '../vendor',
      angular: '../vendor/angular',
      jquery: '../vendor/jquery.min',
      underscore: '../vendor/underscore-min',
      twBootstrap: '../vendor/bootstrap.min'
    },
    shim: {
      twBootstrap: {
        deps: ['jquery']
      },
      angular: {
        deps: ['jquery', 'twBootstrap', 'underscore'],
        exports: 'angular'
      }
    }
  });

  require(['angular'], function() {
    'use strict';
    var App;

    App = angular.module('MaciApp', []);
    App.config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('{[');
      return $interpolateProvider.endSymbol(']}');
    });
    App.config([
      '$routeProvider', function($routeProvider) {
        return $routeProvider.when('/', {
          action: 'landingpage'
        }).when('/search', {
          action: 'search'
        }).when('/profile', {
          action: 'profile.dashboard'
        }).when('/profile/inbox', {
          action: 'profile.inbox'
        }).when('/profile/ad', {
          action: 'profile.ad'
        }).when('/profile/loan', {
          action: 'profile.loan'
        }).when('/profile/data', {
          action: 'profile.data'
        }).when('/profile/account', {
          action: 'profile.account'
        }).when('/profile/ad/new', {
          action: 'newad'
        }).otherwise({
          redirectTo: '/'
        });
      }
    ]);
    App.run([
      '$rootScope', '$location', '$routeParams', '$route', function($rootScope, $location, $routeParams, $route) {
        $rootScope.log = console.log;
        $rootScope.routeParams = $routeParams;
        $rootScope.isEmptyObject = $.isEmptyObject;
        $rootScope.appInitialized = true;
        $rootScope.pageLocation = function() {
          var path;

          path = $location.path();
          if (path === '/') {
            return 'index';
          } else {
            return path.split('/')[1];
          }
        };
        return $rootScope.$on("$routeChangeSuccess", function(currentRoute, prevRoute) {
          var action;

          action = $route.current.action;
          if (action) {
            $rootScope.renderAction = action;
            $rootScope.renderPath = action.split(".");
            return $rootScope.username = $routeParams.username || "anonyme";
          }
        });
      }
    ]);
    return $(function() {
      angular.bootstrap(document, ['MaciApp']);
      return console.log('hello world');
    });
  });

}).call(this);

/*
//@ sourceMappingURL=main.map
*/