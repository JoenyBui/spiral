(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBt3t6L4-m_YlJHaZ57GEVNGMWXkf8n0SI",
            authDomain: "spiral-91aa0.firebaseapp.com",
            databaseURL: "https://spiral-91aa0.firebaseio.com",
            storageBucket: "spiral-91aa0.appspot.com",
            messagingSenderId: "812064767363"
        };
        firebase.initializeApp(config);

        /*
        Online/Offline State Done The Right Way
        onDisconnect - a function that tells the Firebase server to do something
            when it notices a client isn't connected anymore.

         Need to instruct the Firebase server to set the user's boolean
         to 'false' when it detects that the client went offline.
         */
        var ref = firebase.database().ref();


    }
})();
