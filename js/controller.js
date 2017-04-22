(function (angular) {

    var app = angular.module('todos.controller', ['ngRoute']);

    //路由设置
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider.when('/:status?', {
            templateUrl: './temp/temp.html',
            // template: '<h1>template</h1>',
            controller: 'todosController'
        });
    }]);

    // 创建控制器
    app.controller('todosController', ['$scope', '$location', '$window', '$routeParams', '$route', function ($scope, $location, $window, $routeParams, $route) {

        //通过service获取后台数据
        var dbstr = $window.localStorage.getItem('task') || '[]';
        $scope.task = JSON.parse(dbstr);

        //用户输入的新项目
        $scope.newTask = '';

        //修改任务的视图id
        $scope.editingId = -1;

        //全局任务状态
        $scope.isSelectedAll = false;

        //控制显示task的筛选条件
        $scope.taskShowSelect = {};

        //将$location加入到数据模型中
        $scope.location = $location;

        // var eachArr = function (arr, callback) {
        //     for (var i = 0; i < arr.length; ++i) {
        //         callback && callback(arr[i], i);
        //     }
        // };

        //添加任务
        $scope.addTask = function () {
            if ($scope.newTask == '') {
                return;
            }
            var thisId = 1;
            if ($scope.task.length != 0) {
                thisId = $scope.task[$scope.task.length - 1].id + 1;
            }
            $scope.task.push({id: thisId, item: $scope.newTask, complete: false});
            $scope.newTask = '';
        };

        //移除任务
        $scope.removeTask = function (id) {
            for (var i = 0; i < $scope.task.length; ++i) {
                if ($scope.task[i].id == id) {
                    $scope.task.splice(i, 1);
                    return;
                }
            }
        };

        //修改任务
        $scope.edit = function (id) {
            $scope.editingId = id;
        };

        //取消任务的可编辑框
        $scope.save = function () {
            $scope.editingId = -1;
        };

        //批量切换任务状态
        $scope.toggleAll = function () {
            // eachArr($scope.task, function (e, i) {
            //     e.complete = $scope.isSelectedAll;
            // });
            for (var i = 0; i < $scope.task.length; ++i) {
                $scope.task[i].complete = $scope.isSelectedAll;
            }
        };

        //批量清除以完成任务
        $scope.clearCompleted = function () {
            for (var i = 0; i < $scope.task.length; ++i) {
                if ($scope.task[i].complete) {
                    $scope.task.splice(i, 1);
                    //在循环中删除数组中的元素会使数组长度发生变化
                    //但是索引i却会一直自增
                    //所以在删除元素时，索引回退
                    --i;
                }
            }
        };

        //使批量清除已完成任务按钮根据需要显示
        $scope.isShow = function () {
            for (var i = 0; i < $scope.task.length; ++i) {
                if ($scope.task[i].complete) {
                    return true;
                }
            }
            return false;
        };

        //显示为未完成的任务数
        $scope.unCompleted = function () {
            var sum = 0;
            for (var i = 0; i < $scope.task.length; ++i) {
                if (!$scope.task[i].complete) {
                    ++sum;
                }
            }
            return sum;
        };

        //使用过滤器过滤显示的内容
        $scope.allTask = function () {
            $scope.taskShowSelect = {};
        };
        $scope.activeTask = function () {
            $scope.taskShowSelect = {complete: false};
        };
        $scope.completedTask = function () {
            $scope.taskShowSelect = {complete: true};
        };

        // 使用url的hash值（锚点）来分别显示内容
        $scope.$watch('location.url()', function () {
            switch ($routeParams['status']) {
                case 'active':
                    $scope.taskShowSelect = {complete: false};
                    break;
                case 'completed':
                    $scope.taskShowSelect = {complete: true};
                    break;
                // case '':
                //     $scope.taskShowSelect = {};
                //     break;
                default:
                    $scope.taskShowSelect = {};
                    // $route.updateParams({status: '/'});
                    break;
            }
        });

        $scope.$watch('task', function () {
            $window.localStorage.setItem('task', JSON.stringify($scope.task));
        }, true);
    }]);

})(angular);