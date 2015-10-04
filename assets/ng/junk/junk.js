angular.module('JunkyardApp.junk', ['ui.router', 'JunkyardApp.dataService'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
    $stateProvider
        .state('junk', {
            abstract: true,
            url: '/junk',
            templateUrl: 'assets/ng/junk/junk.html',
            resolve: {
                junk: ['junk', function(junk) {
                    return junk();
                }],
                mods: ['mods', function(mods) {
                    return mods();
                }],
                base: ['base', function(base) {
                    return base();
                }]
            },
            controller: 'JunkCtrl'
        })
        .state('junk.list', {
            url: '',
            templateUrl: 'assets/ng/junk/junk.list.html'
        })
        .state('junk.detail', {
            url: '/:junkName',
            templateUrl: 'assets/ng/junk/junk.detail.html',
            controller: 'JunkDetailCtrl'
        });
    }
])

.controller('JunkCtrl', ['$scope', '$state', 'junk', 'mods', 'base',
    function ($scope, $state, junk, mods, base) {
        $scope.junk = junk;
        $scope.mods = mods;
        $scope.base = base;
        $scope.getModifier = function getModifier(junk1, junk2) {
            var junkProduct = junk1.i * junk2.i;

            for (var i = 0; i < mods.length; i++) {
                if ((junkProduct >= mods[i].m) && (junkProduct <= mods[i].M))
                    return mods[i];
            }

            return base[junkProduct % 6];
        }
    }
])
