angular.module('JunkyardApp.junk')

.controller('JunkDetailCtrl', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {
        $scope.thisJunk = $scope.junk.filter(function(j) {
            return j.n == $stateParams.junkName;
        })[0]

        if (!$scope.thisJunk) {
            $state.go('home');
        } else {
            $scope.combos = [];
            for (var i = 0; i < $scope.junk.length; i++) {
                $scope.combos.push([
                    $scope.junk[i],
                    $scope.getModifier($scope.thisJunk, $scope.junk[i])
                ]);
            }
        }
    }
]);
