app.controller("dangkyCtrl", function($scope, $rootScope, $http) {
    localStorage.setItem("contro","#dangky");
    var check = 0;
    $scope.start = function() {
        $rootScope.Students.forEach(arr => {
            if (arr.email == $scope.Student.email) {
                check = 1;
            }
        });
        if (check == 1) {
            Swal.fire({
                title: '<h1>Tài khoản đã tồn tại</h1> ',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            })
        } else {
            var temp =  document.getElementById("birth").value;
                $scope.Student.birthday = temp;
            firebase.database().ref("Students/" + $scope.Student.username).set($scope.Student);
            // $rootScope.Students.push($scope.Student);
            Swal.fire({
                icon: 'success',
                title: 'Đăng ký thành công!',
                showConfirmButton: false,
                timer: 1500
            })
            window.location.href = "#dangnhap";
        }
    }
    $scope.cancel = function() {
        window.location.href = "#trangchu"
    }
});
app.directive("rePass", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, mCtrl) {
            function rePas(value) {
                var pass = scope.Student.password;
                if (pass == value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(rePas);
        }
    }
});