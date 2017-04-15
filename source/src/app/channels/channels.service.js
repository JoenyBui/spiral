/**
 * Created by joeny on 4/10/17.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('ChannelsFactory', ChannelsFactory);

    function ChannelsFactory($firebaseArray) {
        var ref = firebase.database().ref('channels');
        var channels = $firebaseArray(ref);

        return channels;
    }
})();
