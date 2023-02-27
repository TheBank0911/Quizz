app.controller("thitracnghiemCtrl", function($scope, $rootScope, $routeParams, $http, $interval) {
    localStorage.setItem("contro","#thitracnghiem");
    $scope.indexquestion = 0;
    $scope.mark = 0;
    $scope.expression = [];
    $rootScope.time = 600;
    $scope.checkOut = 0;
    $rootScope.Subjects.forEach(arr => {
        if (arr.Id == $routeParams.id) {
            $scope.subject = angular.copy(arr);
            return;
        }
    });
    $scope.start = function() {
        $http.get('db/Quizs/' + $routeParams.id + '.js').then(function(response) {
            $scope.questions = response.data;
            ranDom();
        });
    }

    function ranDom() {
        var dem = 0;
        $scope.Questions = [];
        for (var i = 0; i < 10; i++) {
            var ran = Math.floor(Math.random() * $scope.questions.length);
            $scope.Questions[dem] = $scope.questions[ran];
            $scope.questions.splice(ran, 1);
            dem++;
        }
        LoadAnswer(0);
    }
    var clock = $interval(function() {
        if ($rootScope.time > 0) {
            $rootScope.time -= 1;
        } else if ($rootScope.time == 0) {
            if ($scope.checkOut == 0) {
                Swal.fire({
                    title: 'Hết giờ',
                    text: 'Tổng số điểm của bạn: ' + $scope.mark,
                    iconHtml: '<img src="images/clock.png">',
                })
            }
            window.location.href = "#monhoc";
            $interval.cancel(clock);
        }
    }, 1000);
    $scope.moveQuestion = function(x) {
        $scope.indexquestion = x;
        LoadAnswer($scope.indexquestion);
    }

    function LoadAnswer(x) {
        $scope.answers = angular.copy($scope.Questions[x].Answers);
    }
    $scope.checkAnswer = function() {
        if ($scope.Questions[$scope.indexquestion].AnswerId == $scope.expression[$scope.indexquestion].answer) {
            Swal.fire({
                icon: 'success',
                title: 'Bạn đã trả lời đúng!',
            });
            $scope.mark++;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Bạn đã trả lời sai!',
            });
        }
    }

    $scope.endkt = function() {
        Swal.fire({
            title: 'Bạn chắc chắn muốn kết thúc bài kiểm tra?',
            showDenyButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
        })
    }

    $scope.prev = function() {
        if ($scope.begin > 0) {
            $scope.begin -= 6;
        }
    }

    $scope.next = function() {

        if ($scope.begin < ($scope.pageCount - 1) * 6) {
            $scope.begin += 6;
        }
    }
    $scope.finish = function() {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn thật sự muốn kết thúc bài thi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.value) {
                $scope.checkOut = 1;
                $rootScope.time = 3;
                Swal.fire({
                    title: 'Kết thúc bài thi',
                    text: 'Tổng số điểm của bạn: ' + $scope.mark,
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 3000
                });


            }
        })

    }
});