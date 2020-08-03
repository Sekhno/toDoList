(function(){
    'use strict';

    var app = angular.module('todoApp', []);

    app.controller('TodoListController', todoListController);

    function todoListController(){
        console.log('To do list controller!')
        var todoList = this;

        todoList.todos = [];

        todoList.addTodo = function() {
            var regex = /[\w]{3,}/;
            console.log(this.todoText, regex.test(this.todoText));
            if (!this.todoText || !regex.test(this.todoText)) {
                return this.showModal(true);
            }
            this.todos.push(new Todo(this.todoText, false));
            this.todoText = '';
        }

        todoList.removeTodo = function(index) {
            this.todos.splice(index, 1);
        }

        todoList.showModal = function(state) {
            this.modalShow = state;

        }
    }

    function Todo(text, completed){
        this.text = text;
        this.done = completed;
    }

    app.directive('onKeyup', onKeyup);

    function onKeyup(){
        return function(scope, elm, attrs) {
            function applyKeyup() {
                scope.$apply(attrs.onKeyup);
            };

            var allowedKey = scope.$eval(attrs.key);
            elm.bind('keyup', function (evt) {
                //if no key restriction specified, always fire
                console.log(allowedKey);
                if (allowedKey == evt.which) {
                    applyKeyup();
                }
                // if (!allowedKeys || allowedKeys.length == 0) {
                //     applyKeyup();
                // } else {
                //     angular.forEach(allowedKeys, function (key) {
                //         if (key == evt.which) {
                //             applyKeyup();
                //         }
                //     });
                // }
            });
        }
    }
})();