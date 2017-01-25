(function() {
    'use strict';

    angular
        .module('app')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $state, $firebaseObject) {
        var ref = firebase.database().ref();

        // download the data into a local object
        var data = $firebaseObject(ref);
        // putting a console.log here won't work, see below

        // default redirect if access is denied
        function redirectError() {
            $state.go('500');
        }

        // watches

        // redirect all errors to permissions to 500
        var errorHandle = $rootScope.$on('$stateChangeError', redirectError);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            errorHandle();
        });
    }
})();
