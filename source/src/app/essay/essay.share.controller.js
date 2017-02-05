/**
 * Created by joeny on 1/31/17.
 */
(function () {
    'use strict';

    angular
        .module('app.essay')
        .controller('EssayShareDialogController', EssayShareDialogController);

    function EssayShareDialogController($mdDialog, $mdConstant, model) {
        var vm = this;

        var semicolon = 186;
        vm.model = model;
        vm.sharedUsers = [];
        vm.customKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];
        
        vm.addUser = function () {

        };

        vm.cancelClick = function() {
            $mdDialog.hide();
        }
    }
})();

