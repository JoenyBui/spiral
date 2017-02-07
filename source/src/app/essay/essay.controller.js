(function() {
    'use strict';

    angular
        .module('app.essay')
        .controller('EssayPageController', EssayPageController);

    /* @ngInject */
    function EssayPageController($scope, $firebaseObject, $mdDialog, loadItem) {
        var vm = this;

        vm.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            indentWithTabs: true
        };
        vm.loadItem = loadItem;
        
        // Get Firebase Database reference.
        var firepadRef = loadItem.ref;

        vm.obj = $firebaseObject(firepadRef);
        vm.obj.$bindTo($scope, 'item').then(function () {
            // console.log($scope.item);

            vm.obj.$watch(function() {
//                 $scope.item.timestamp = new Date().toLocaleString();
            });
        });


        //// Create CodeMirror (with lineWrapping on).
        var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
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

        $scope.$on('openShareDialog', function (event, $event) {
            $mdDialog.show({
                controller: 'EssayShareDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/essay/essay.share.dialog.html',
                locals: {
                    model: vm.loadItem
                },
                targetEvent: $event
            }).then(function () {
                // pop a toast
                // $mdToast.show(
                //   $mdToast.simple()
                //       .textContent('WhAM Input submitted to run!')
                //     .position('bottom right')
                //     .hideDelay(2000)
                // )
            })
        })

    }
})();
