# Függőségek konfigurálása
require.config
  baseUrl: 'static/js/lib/'
  paths:
    vendor: '../vendor'
    angular: '../vendor/angular'
    jquery: '../vendor/jquery.min'
    underscore: '../vendor/underscore-min'
    twBootstrap: '../vendor/bootstrap.min'

  shim:
    twBootstrap:
      deps: ['jquery']

    angular:
      deps: ['jquery', 'twBootstrap', 'underscore']
      exports: 'angular'


require ['angular'], () ->
  'use strict'

  # Alkamazás modul létrehozása
  App = angular.module('MaciApp', [])

  # Template speciális TAG-ek beállítása (defalt: {{ }} )
  App.config ($interpolateProvider) ->
    $interpolateProvider.startSymbol '{['
    $interpolateProvider.endSymbol ']}'

  # Router konfigurálása
  App.config(['$routeProvider', ($routeProvider) ->

    $routeProvider
      .when('/',
        action: 'landingpage'
      )
      .when('/search'
        action: 'search'
      )

      # PROFILE
      .when('/profile',         action: 'profile.dashboard')

      .when('/profile/inbox',   action: 'profile.inbox')
      .when('/profile/ad',      action: 'profile.ad')
      .when('/profile/loan',    action: 'profile.loan')
      .when('/profile/data',    action: 'profile.data')
      .when('/profile/account', action: 'profile.account')
      .when('/profile/ad/new',  action: 'newad')
      .otherwise redirectTo: '/'
  ])
    #$locationProvider.html5Mode(true);

  # Alkalmazás iniclializálása
  App.run([ '$rootScope', '$location', '$routeParams', '$route', ($rootScope, $location, $routeParams, $route) ->

    # Változók és függvények beszúrása a $rootScope-ba
    $rootScope.log = console.log
    $rootScope.routeParams = $routeParams
    $rootScope.isEmptyObject = $.isEmptyObject

    $rootScope.appInitialized = true

    $rootScope.pageLocation = ->
      path = $location.path()
      if path == '/' then 'index' else path.split('/')[1]

    # URL változás figyelése
    $rootScope.$on "$routeChangeSuccess", (currentRoute, prevRoute) ->
      action = $route.current.action
      if action
        $rootScope.renderAction = action
        $rootScope.renderPath = action.split "."
        $rootScope.username = $routeParams.username || "anonyme"
  ])

  # Alkalmazás indtása a Document.ready-re
  $ ->
    angular.bootstrap document, ['MaciApp']
    console.log 'hello world'

