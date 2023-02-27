app.controller("dangnhapCtrl", function($scope, $rootScope, $http) {
  localStorage.setItem("contro","#dangnhap");
  var check = 0;
    $scope.start = function() {
        $rootScope.Students.forEach(arr => {
            if (arr.email == $scope.Student.email && arr.password == $scope.Student.password) {
                localStorage.setItem("user-name", arr.username);
                localStorage.setItem("user-pass", arr.password);
                $rootScope.Student = arr;
                $rootScope.indexStudent = arr.index;
                check = 1;
                return;
            }
        });
        if (check == 0) {
            Swal.fire({
                title: '<h3>Email hoặc mật khẩu không đúng!</h3> ',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                showConfirmButton: false,
                timer: 1500

            })
            window.location.href = "#trangchu";
        }
    };
    function login() {
        let email = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;
        var dbRef = firebase.database().ref().child("Students");
        dbRef.on(
          "value",
          (snapshot) => {
            console.log(snapshot.val());
            snapshot.forEach(function (childSnapshot) {
              console.log(snapshot.numChildren());
              var key = childSnapshot.key;
              console.log(key);
              console.log(snapshot.child(key).val());
            });
          },
          (errorObject) => {
            console.log("The read failed: " + errorObject.name);
          }
        );
      }
});