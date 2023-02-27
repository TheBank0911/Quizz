app.controller("trangchuCtrl", function($scope, $rootScope, $http) {
    localStorage.setItem("contro","#trangchu");
    $scope.test = function(id) {
        window.location.href = "#thitracnghiem/" + id;
    }
})
$("figure").mouseleave(
    function() {
        $(this).removeClass("hover");
    }
);