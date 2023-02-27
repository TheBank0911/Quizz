app.controller("quenmatkhauCtrl", function($scope, $rootScope, $http) {
    localStorage.setItem("contro","#quenmatkhau");
    $scope.mail = 0;
    $scope.user=null;
    $scope.mxacn = 0;
    $scope.check = 0;
    $scope.checkMail = function() {
        $rootScope.Students.forEach(arr => {
            if (arr.email == $scope.mail) {
                $scope.check = 1;
                $scope.user=arr.username;
            }
        });
        if ($scope.check == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Email không tồn tại!',
                showConfirmButton: false,
                timer: 2000
            })
        }
    };
    $scope.update = function() {
        firebase.database().ref("Students/" + $scope.user+"/password").set($scope.Student.password);
        Swal.fire({
            icon: 'success',
            title: 'Đổi mật khẩu thành công!',
        });
        window.location.href = "#dangnhap";
    }
    var btn = document.getElementById('btn');
    btn.addEventListener('click', function(e) {
        e.preventDefault()
        let email = document.getElementById('email').value;
        let mxn = Math.floor(Math.random() * 1000000);
        localStorage.setItem("valid-code", mxn);
        Email.send({
                SecureToken: "9aa17d61-3edc-4825-b23d-ddfc713b5e5c",
                To: email,
                From: 'Quizzcompany@gmail.com',
                Subject: "MÃ XÁC NHẬN",
                Body: "Mã xác nhận của bạn là: " + mxn
            })
            .then(
                Swal.fire({
                    icon: 'success',
                    title: 'Gửi mail thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            );
    })
    $scope.checkValidCode = function() {
        let validCode = localStorage.getItem("valid-code");
        let getInpValid = document.getElementById('validCode').value;
        if (validCode == getInpValid) {
            Swal.fire({
                icon: 'success',
                title: 'Mã xác nhận hợp lệ!',
                showConfirmButton: false,
                timer: 1500
            })
            $scope.mxacn = 1;
        } else {
            Swal.fire({
                title: '<h3>Mã xác nhận không hợp lệ!</h3>',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            })
            $scope.mxacn = 0;
        }
    }


});