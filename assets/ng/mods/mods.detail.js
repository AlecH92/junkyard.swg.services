angular.module('JunkyardApp.mods')

.controller('ModsDetailCtrl', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {
        $scope.thisMod = $scope.mods.concat($scope.base).filter(function(m) {
            return m.n == $stateParams.modName;
        })[0]

        if (!$scope.thisMod) {
            $state.go('home');
        } else {
            $scope.combos = [];
            for (var i = 0; i < $scope.junk.length; i++) {
                for (var j = 0; j < $scope.junk.length; j++) {
                    if ($scope.getModifier($scope.junk[i], $scope.junk[j]).n == $scope.thisMod.n) {
                        $scope.combos.push([$scope.junk[i], $scope.junk[j]]);
                    }
                }
            }
        }
    }
]);
