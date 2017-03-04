/**
 * Created by joeny on 1/25/17.
 */
(function () {
    'use strict';

    angular
        .module('app.essay')
        .factory('EssayFactory', EssayFactory);

    function EssayFactory($firebaseArray, $firebaseObject) {
        var essaysRef = firebase.database().ref('essay');
        var essays = $firebaseArray(essaysRef);

        var EssayFactory = {
            getEssay: function (eid) {
                // var essay = new EssayFactory.Essay();
                // essay.eid = eid;
                // essay.ref = essaysRef.child(eid);

                // Load the object to load the extra data.
//                 var obj = $firebaseObject(essay.ref);
                var obj = $firebaseObject(essaysRef.child(eid));
                return obj.$loaded();
                // obj.$loaded(function (data) {
                //     essay.load(data);
                // });
                //
                // return essay;
//                 return essaysRef.child(eid);
                // return $firebaseObject(essaysRef.child(eid))
            },
            getRef: function (eid) {
                return essaysRef.child(eid);
            },
            all: essays
        };

        EssayFactory.Essay = function (uid) {
            this.name = "Untitled document";
            this.ref = "";
            this.owner = uid;
            this.timestamp = new Date().toLocaleString();
            this.authorizedUsers = [uid];
            this.history = [];
        };

        EssayFactory.Essay.prototype = {
            sharedWithUser: function (id) {
                // Make sure no replication.
                this.authorizedUsers.push(id);
            },

            load: function(data) {
               this.name = typeof data.name !== 'undefined' ? data.name : "Untitled document";
               this.owner = data.owner;
               this.timestamp = typeof data.timestamp !== 'undefined' ? data.timestamp : new Data().toLocaleString();
               this.authorizedUsers = typeof data.authorizedUsers !== 'undefined' ? data.authorizedUsers : [];
               this.history = data.history;
            }
        };

        return EssayFactory;
    }
})();
