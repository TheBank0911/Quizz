var app = angular.module("myApp", []);
app.controller("myctrl", function($scope, $http) {
    var Id = null;
    $scope.indexquestion = 0;
    $scope.name = null;
    $http.get('db/Subjects.js').then(function(response) {
        $scope.subjects = response.data;
    });
    $scope.test = function(id) {
        window.location.href = "thitracnghiem.html#!" + id;
        Id = id;
        $scope.name = name;
    }
    $http.get('db/Quizs/' + Id + '.js').then(function(response) {
        $scope.questions = response.data;
    });
    // Loadquestion();

    function Loadquestion() {
        $scope.question = angular.copy($scope.questions[$scope.indexquestion]);
    }

    function LoadAnswer() {
        $scope.answers = angular.copy($scope.questions[$scope.indexquestion].Answers);
    }

    function check() {
        var x = window.location.href
    }
});