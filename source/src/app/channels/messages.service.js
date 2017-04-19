/**
 * Created by joeny on 4/15/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('MessagesFactory', MessagesFactory);

    function MessagesFactory($firebaseObject, $firebaseArray) {
        var channelMessagesRef = firebase.database().ref('channelMessages');
        var userMessagesRef = firebase.database().ref('userMessages');

        return {
            forChannelRef: function (channelId) {
                return channelMessagesRef.child(channelId);
            },
            forChannelObj: function (channelId) {
                return $firebaseObject(channelMessagesRef.child(channelId));
            },
            forChannel: function(channelId){
                return $firebaseArray(channelMessagesRef.child(channelId));
            },
            forUsersRef: function (uid1, uid2) {
                var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

                return userMessagesRef.child(path);
            },
            forUsersObj: function (uid1, uid2) {
                var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

                return $firebaseObject(userMessagesRef.child(path));
            },
            forUsers: function(uid1, uid2) {
                var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

                return $firebaseArray(userMessagesRef.child(path));
            }
        };
    }
})();
