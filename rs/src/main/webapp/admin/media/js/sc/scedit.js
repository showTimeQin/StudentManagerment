// 获取展示表格
var table = $('#tb_role');

// 定义全局变量
// User
var apiUrlUser = "/api/v1/scs";//TODO:this
// // Authority
// var apiUrlRoles = "/api/v1/sysroles";

// 定义当前angularjs的实例
var app = angular.module('page',['ngResource', 'ngRoute']);

// 设置location
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

// 操作form的controller
app.controller('form', ['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window){
    $scope.process = "查询中，请稍等...";

    $scope.enableds = [
    {id:0, value: "禁用"},
    {id:1,value: "启用"}
    ];

    // 定义form的数据存储地方
    $scope.formData = {
    enabled: 1 // 初始化select的值，1为启用，参考 $scope.enableds
    };


    // 定义submit方法
    $scope.submit = function () {

        // 默认是插入新记录
        url = apiUrlUser;
        method = 'POST';

        // 当id存在时，证明是要更新
        if($scope.formData.id != null && $scope.formData.id != ""){
            url = apiUrlUser + "/" + $scope.formData.id;
            method = 'PUT';
        }

        // 提交数据的方式
        $http({
            method: method,
            url: url,
            data: $scope.formData,
            dataType: "application/json"
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            // The response object has these properties:
            //
            //     data – {string|Object} – The response body transformed with the transform functions.
            //     status – {number} – HTTP status code of the response.
            //     headers – {function([headerName])} – Header getter function.
            //     config – {Object} – The configuration object that was used to generate the request.
            //     statusText – {string} – HTTP status text of the response.

            // 设置跳转
            redirectToUrl("/admin/sc/index.html", redirectTime);//TODO:this

            $scope.process = "提交数据成功";
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.process = "提交数据失败！";
        });
    }

    
    
    
    
    
    
    
    
    
    
    
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/createTimes/all"
//    }).then(function successCallback(response) {
//    $scope.createTimes = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/updateTimes/all"
//    }).then(function successCallback(response) {
//    $scope.updateTimes = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/studentNumbers/all"
//    }).then(function successCallback(response) {
//    $scope.studentNumbers = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/studentNames/all"
//    }).then(function successCallback(response) {
//    $scope.studentNames = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/courseNumbers/all"
//    }).then(function successCallback(response) {
//    $scope.courseNumbers = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/courseNames/all"
//    }).then(function successCallback(response) {
//    $scope.courseNames = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/fractions/all"
//    }).then(function successCallback(response) {
//    $scope.fractions = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/gradeRankings/all"
//    }).then(function successCallback(response) {
//    $scope.gradeRankings = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/gradeRanking_percents/all"
//    }).then(function successCallback(response) {
//    $scope.gradeRanking_percents = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/classRankings/all"
//    }).then(function successCallback(response) {
//    $scope.classRankings = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });
//    $http({
//    method: 'GET',
//    url:"/api/v1/scs/classRankingPercents/all"
//    }).then(function successCallback(response) {
//    $scope.classRankingPercents = response.data.data;
//    $scope.process = "";
//    }, function errorCallback(response) {
//    $scope.process = "提交数据失败！";
//    });

    // 获取url上的参数 - id
    var id =  $location.search().id;

    // 当id不存在时，判定为新增
    if(id !== undefined){
        // 更新时的操作
        $http({
            method: 'GET',
            url:apiUrlUser + '/' + id
        }).then(function successCallback(response) {
            $scope.formData = response.data.data;

            $scope.process = "";
                        $("#createTime").attr("readonly", "readonly")
                                $("#updateTime").attr("readonly", "readonly")
                                $("#studentNumber").attr("readonly", "readonly")
                                $("#studentName").attr("readonly", "readonly")
                                $("#courseNumber").attr("readonly", "readonly")
                                $("#courseName").attr("readonly", "readonly")
                                $("#gradeRanking").attr("readonly", "readonly")
                                $("#gradeRanking_percent").attr("readonly", "readonly")
                                $("#classRanking").attr("readonly", "readonly")
                                $("#classRankingPercent").attr("readonly", "readonly")
                    }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.process = "提交数据失败！";
        });
    }else{
        $scope.process = "";
    }
}]);