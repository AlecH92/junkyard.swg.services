angular.module('JunkyardApp', [
    'JunkyardApp.junk',
    'JunkyardApp.mods',
    'ui.bootstrap',
    'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
}])

.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
     $rootScope.$on('$stateChangeSuccess', function(event) {
        if (!$window.ga) return;
        $window.ga('send', 'pageview', { page: $location.path() });
    });
}]);
