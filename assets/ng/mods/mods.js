angular.module('JunkyardApp.mods', ['ui.router', 'JunkyardApp.dataService'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
    $stateProvider
        .state('mods', {
            abstract: true,
            url: '/mods',
            templateUrl: 'assets/ng/mods/mods.html',
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
            controller: 'ModsCtrl'
        })
        .state('mods.list', {
            url: '',
            templateUrl: 'assets/ng/mods/mods.list.html'
        })
        .state('mods.detail', {
            url: '/:modName',
            templateUrl: 'assets/ng/mods/mods.detail.html',
            controller: 'ModsDetailCtrl'
        });
    }
])

.controller('ModsCtrl', ['$scope', '$state', 'junk', 'mods', 'base',
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
