angular.module('JunkyardApp.dataService', [])

.factory('junk', ['$http', function($http) {
    var path = 'assets/junk.json';
    var junk = $http.get(path).then(function(res) {
        return res.data;
    });

    return function() {
        return junk;
    }
}])

.factory('mods', ['$http', function($http) {
    var path = 'assets/mods.json';
    var mods = $http.get(path).then(function(res) {
        return res.data;
    });

    return function() {
        return mods;
    }
}])

.factory('base', ['$http', function($http) {
    var path = 'assets/base.json';
    var base = $http.get(path).then(function(res) {
        return res.data;
    });

    return function() {
        return base;
    }
}]);
