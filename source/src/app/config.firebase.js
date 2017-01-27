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

        // // Get Firebase Database reference.
        // var firepadRef = firebase.database().ref();
        //
        // // Create CodeMirror (with lineWrapping on).
        // var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
        //
        // // Create Firepad (with rich text toolbar and shortcuts enabled).
        // var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        //     richTextShortcuts: true,
        //     richTextToolbar: true,
        //     defaultText: 'Hello, World!'
        // });
    }
})();
