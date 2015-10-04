angular.module('JunkyardApp', [
    'JunkyardApp.junk',
    'JunkyardApp.mods',
    'ui.bootstrap',
    'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,  $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "assets/ng/common/home.html"
        })
        .state('about', {
            url: "/about",
            templateUrl: "assets/ng/common/about.html"
        });
}]);
