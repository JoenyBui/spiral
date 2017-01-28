(function() {
    'use strict';

    angular
        .module('essay')
        .controller('EssayPageController', EssayPageController);

    /* @ngInject */
    function EssayPageController($scope, $firebaseObject, loadItem) {
        var vm = this;

        vm.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            indentWithTabs: true
        };

        // Get Firebase Database reference.
        var firepadRef = loadItem;

        vm.obj = $firebaseObject(firepadRef);
        vm.obj.$bindTo($scope, 'item').then(function () {
            console.log($scope.item);
            
            vm.obj.$watch(function() {
                $scope.item.timestamp = new Date().toLocaleString();
            });
        });


        //// Create CodeMirror (with lineWrapping on).
        var codeMirror = CodeMirror(
            document.getElementById('firepad-container'),
            {
                lineWrapping: true,
                lineNumber: true
            }
        );

        // Create Firepad (with rich text toolbar and shortcuts enabled).
        var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
            richTextShortcuts: true,
            richTextToolbar: true,
            defaultText: 'Hello, World!'
        }).on('synced', function (isSynced) {
            $scope.item.timestamp = new Date().toLocaleString();
        });

    }
})();
