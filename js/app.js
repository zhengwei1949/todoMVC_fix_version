(function (angular) {
    // 'use strict';

    //创建模块
    var app = angular.module('todos', ['todos.controller']);

    // TODO 需要实现双击任务显示修改框时自动获得焦点
    app.directive('setFocus', function () {
        return {
            link: function (scope, element, attr) {
                element.on('dblclick', function () {
                    console.log(111)
                    var that = this;
                    setTimeout(function(){
                        angular.element(that).parent().next().children()[0].focus();
                    },0);
                })
            }
        }
    });


})(angular);
