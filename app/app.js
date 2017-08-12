'use strict';

// Declare app level module which depends on views, and components
var akshay = angular.module('akshay', ['ui.router']);
akshay.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/landing');

    $stateProvider
        .state('landing', {
            url: '/landing',
            templateUrl: 'views/landing.html'
        })

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/view2.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'views/view2.html'   
        });

});
