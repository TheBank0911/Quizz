app.controller("monhocCtrl", function($scope, $rootScope, $http) {
    localStorage.setItem("contro","#monhoc");
    $scope.test = function(id) {
        window.location.href = "#thitracnghiem/" + id;
    }

    $rootScope.begin = 0;
    $scope.pageCount = Math.ceil($rootScope.subjects.length / 6);
    $scope.prev = function() {
        if ($rootScope.begin > 0) {
            $rootScope.begin -= 6;
        }
    }
    $scope.next = function() {
        if ($rootScope.begin < ($scope.pageCount - 1) * 6) {
            $rootScope.begin += 6;
        }
    }
})