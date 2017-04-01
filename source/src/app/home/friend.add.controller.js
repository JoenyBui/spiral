/**
 * Created by joeny on 3/27/17.
 */
(function () {
    'use strict';

    angular
        .module('app.essay')
        .controller('FriendAddDialogController', FriendAddDialogController);

    function FriendAddDialogController($rootScope, $mdDialog, $mdConstant, $mdToast, $filter, $firebaseObject, Users, model) {
        var vm = this;

        var semicolon = 186;

        vm.model = model;
        vm.users = [];
        vm.customKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];

        vm.ref = firebase.database().ref().child('sharedTokens');

        vm.addUser = function() {
            for (var key in vm.users) {
                var email = vm.users[key];

                var promise = Users.findUserByEmail(email);

                promise.then(function(data) {
                    // Broadcast Results
                    $rootScope.$broadcast('addToFriendslist', data.uid);

                }, function(email) {
                    $mdToast.show(
                        $mdToast.simple(email + ' does not exists.')
                            .content()
                            .position('bottom right')
                            .action($filter('triTranslate')('Login'))
                            .highlightAction(true)
                            .hideDelay(0)
                    );
                })
            };

            $mdDialog.hide();
        };

        vm.cancelClick = function() {
            $mdDialog.hide();
        }
    }
})();

