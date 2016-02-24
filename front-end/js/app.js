angular
  .module('emotions', ['ngResource', 'angular-jwt', 'ui.router', 'wu.staticGmap'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "./js/views/home.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "./js/views/login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "./js/views/register.html"
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "./js/views/profile.html"
      })
      .state('users', {
        url: "/users",
        templateUrl: "./js/views/users.html"
      })
      .state('moments', {
        url: "/moments",
        templateUrl: "./js/views/moments.html",
        controller: "MomentsController as moments"
      })
      .state('recordmoment', {
        url: "/moment/new",
        templateUrl: "./js/views/recordmoment.html",
        controller: "MomentsController as moments"
      });

    $urlRouterProvider.otherwise("/");
  }
