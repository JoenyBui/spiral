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

        return {
            forChannel: function(channelId){
                return $firebaseArray(channelMessagesRef.child(channelId));
            }
        };
    }
})();
