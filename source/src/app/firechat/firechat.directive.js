/**
 * Created by joeny on 3/7/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .directive('fireChatBox', fireChatBox);

    function fireChatBox() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/firechat/firechat.tmpl.html',
            transclude: true,
            replace: true,
            scope: {
                title: '@',
                subtitle: '@',
                avatar: '@',
                auth: '='
            },
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link
        };
        return directive;

        function link($scope, $element, attrs) {
            // The linking phase is where you attach the data ( $scope ) to the linking function and it should return
            // you the linked html. Since the directive also specifies where this html goes or what it changes, it is
            // already good to go. This is the function where you want to make changes to the linked html, i.e the html
            // that already has the data attached to it. In angular if you write code in the linking function its
            // generally the post-link function (by default). It is kind of a callback that gets called after the
            // linking function has linked the data with the template.

        }

        function Controller($element, FirechatUI) {
            var vm = this;

            vm.initChat = function (user) {
                // Get a Firebase Database ref
                var chatRef = firebase.database().ref("chat");

                // Create a Firechat instance
                var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

//                 Users.getCurrentProfile().then(function (user) {
//                     user.$loaded()
//                         .then(function (data) {
//                             // Set the Firechat user
//                             chat.setUser(user.$id, user.displayName);
//                             console.log('Data', data);
//                         }).catch(function (error) {
//                         console.error("Error, ", error);
//                     });
//                 });
            };

            this.setMenu = function(menu) {
                vm.menu = menu;
            };

            this.setLoading = function(loading) {
                vm.loading = loading;
            };

            vm.initChat();
        }
    }

})();
