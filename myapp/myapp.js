var app = angular.module("myApp", ["ngRoute"]);
app.run(function($rootScope, $http) {
    // let index = localStorage.getItem("contro");
    // if(index){
    //     window.location.href=index;
    // }
    $rootScope.time = 0;
    $rootScope.Students=[];
    $rootScope.Student = null;
    $http.get('db/Subjects.js').then(function(response) {
        $rootScope.Subjects = response.data;
        $rootScope.subjects = $rootScope.Subjects;
    });
    loadingStudent() ;
    function loadingStudent() {
    var dbRef = firebase.database().ref().child("Students");
    dbRef.on(
        "value",
        (snapshot) => {
            var i = 0;
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                $rootScope.Students[i] = snapshot.child(key).val();
                i++;
            });
            autoLogin();
            let index = localStorage.getItem("contro");
            if(index == "#monhoc"){
              index = "#trangchu";
            }
            if(index == "#thitracnghiem"){
                index = "#thitracnghiem";
              }
            if(index==null){
              index = "#dangnhap";
            }
            if (index != "#thitracnghiem") {
              window.location.href = index;
            }
        },
        (errorObject) => {
            console.log("The read failed: " + errorObject.name);
        }
    );
}

    $rootScope.Search = function() {
        $rootScope.begin = 0;
        if ($rootScope.search == "") {
            $rootScope.subjects = angular.copy($rootScope.Subjects);
        } else {
            $rootScope.Subjectstemp = [];
            var dem = 0;
            for (let i = 0; i < $rootScope.Subjects.length; i++) {
                if ((($rootScope.Subjects[i].Name).toLowerCase()).includes(($rootScope.search).toLowerCase())) {
                    $rootScope.Subjectstemp[dem] = angular.copy($rootScope.Subjects[i]);
                    dem++;
                }
            }
            $rootScope.subjects = angular.copy($rootScope.Subjectstemp);
        }
    }

    $rootScope.logout = function() {
        Swal.fire({
            title: 'Bạn có chắc chắn đăng xuất?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Đã đăng xuất!',
                    text: 'Quay lại trang chủ!',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 2000
                });
                $rootScope.Student = null;
                window.location.href = "#trangchu";
            }
        })
        localStorage.setItem("user-name", "none");
        localStorage.setItem("user-pass", "none");
    }

    function autoLogin() {
        let userName = localStorage.getItem("user-name");
        let userPass = localStorage.getItem("user-pass");
        if (userName != "none" && userPass != "none") {
            $rootScope.Students.forEach(arr => {
                if (arr.username == userName && arr.password == userPass) {
                    $rootScope.Student = arr;
                }
            })
        }
    }
    $rootScope.test = function(id) {
        window.location.href = "#thitracnghiem/" + id;
    }
    
});


app.config(function($routeProvider) {
    $routeProvider
        .when("/monhoc", {
            templateUrl: "html/monhoc.html",
            controller: "monhocCtrl"
        })
        .when("/dangky", {
            templateUrl: "html/dangky.html",
            controller: "dangkyCtrl"
        })
        .when("/thongtin", {
            templateUrl: "html/thongtin.html",
            controller: "thongtinCtrl"
        })
        .when("/gioithieu", {
            templateUrl: "html/gioithieu.html",
            controller: "gioithieuCtrl"
        })
        .when("/dangnhap", {
            templateUrl: "html/dangnhap.html",
            controller: "dangnhapCtrl"
        })
        .when("/hotro", {
            templateUrl: "html/hotro.html",
            controller: "hotroCtrl"
        })
        .when("/quenmatkhau", {
            templateUrl: "html/quenmatkhau.html",
            controller: "quenmatkhauCtrl"
        })
        .when("/thitracnghiem/:id", {
            templateUrl: "html/thitracnghiem.html",
            controller: "thitracnghiemCtrl"
        })
        .when("/quenmatkhau", {
            templateUrl: "html/quenmatkhau.html",
            controller: "quenmatkhauCtrl"
        })
        .when("/trangchu", {
            templateUrl: "html/trangchu.html",
            controller: "trangchuCtrl"
        })
        .otherwise({
            redirectTo: "/trangchu"
        });

});