(function() {
    'use strict';

    angular
        .module('essay')
        .controller('EssayPageController', EssayPageController);

    /* @ngInject */
    function EssayPageController(loadItem) {
        var vm = this;

        vm.text = "";

        vm.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            indentWithTabs: true,
            // onLoad : function(_cm){
            //
            //     // HACK to have the codemirror instance in the scope...
            //     $scope.modeChanged = function(){
            //         _cm.setOption("mode", vm.mode.toLowerCase());
            //     };
            // }
        };

        // Get Firebase Database reference.

        // var firepadRef = firebase.database().ref();
        var firepadRef = loadItem;
        var myElement = angular.element(document.querySelector('#firepad-container'));

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
        });

    }
})();
