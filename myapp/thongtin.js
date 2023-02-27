app.controller("thongtinCtrl", function($scope, $rootScope, $http) {
    localStorage.setItem("contro","#thongtin");
    $scope.update = function() {
        firebase.database().ref("Students/" + $scope.Student.username).set($rootScope.Student);
        Swal.fire({
            icon: 'success',
            title: 'Cập nhật thông tin cá nhân thành công!',
        });

    }
});