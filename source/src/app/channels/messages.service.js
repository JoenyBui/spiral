/**
 * Created by joeny on 4/15/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('MessagesFactory', MessagesFactory);

    function MessagesFactory($firebaseArray) {
        var channelMessagesRef = firebase.database().ref('channelMessages');
        var userMessagesRef = firebase.database().ref('userMessages');

        return {
            forChannel: function(channelId){
                return $firebaseArray(channelMessagesRef.child(channelId));
            },
            forUsers: function(uid1, uid2) {
                var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

                return $firebaseArray(userMessagesRef.child(path));
            }
        };
    }
})();
