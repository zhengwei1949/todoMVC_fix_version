(function (angular) {
    var app = angular.module('todos.service', []);
    app.service('todosService', ['$window', function ($window) {
        //获取模拟的数据
        var storage = $window.localStorage;
        var dbstr = storage.getItem('task') || '[]';
        var task = JSON.parse(dbstr);

        this.get = function () {
            return task;
        };

        this.add = function (newTask) {

            localStorage.setItem('task', JSON.stringify(task));
        };

        this.remove = function (id) {
            for (var i = 0; i < task.length; ++i) {
                if (task[i].id == id) {
                    task.splice(i, 1);
                    return;
                }
            }
        };
    }]);
})(angular);