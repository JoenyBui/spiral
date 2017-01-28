/**
 * Created by joeny on 1/25/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Essay', EssayFactory);

    function EssayFactory($firebaseArray, $firebaseObject) {
        var essaysRef = firebase.database().ref('essays');
        var essays = $firebaseArray(essaysRef);

        var Essays = {
            getEssay: function (eid) {
                return essaysRef.child(eid);
                // return $firebaseObject(essaysRef.child(eid))
            },
            all: essays
        };

        return Essays;
    }
})();
