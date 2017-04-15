(function() {
    'use strict';

    angular
        .module('home')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('public', {
            url: '/public',
            views: {
                'root': {
                    templateUrl: 'app/home/cover.html',
                    controller: 'PublicController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('triangular.home', {
            url: '/home',
            // templateUrl: 'app/home/home-page.tmpl.html',
            // // set the controller to load for this page
            // controller: 'HomePageController',
            // controllerAs: 'vm',
            // layout-column class added to make footer move to
            // bottom of the page on short pages
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            },
            views: {
                '': {
                    templateUrl: 'app/home/home-page.tmpl.html',
                    controller: 'HomePageController',
                    controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/home/fab-button.tmpl.html',
                    controller: 'HomeFabController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                auth: function($state, Users, Auth){
                    return Auth.$requireSignIn().catch(function(){
                        // $state.go('triangular.home');
                    });
                },
                ownedEssays: function (auth, $firebaseArray) {
                    var ref = firebase.database().ref().child('essay');
                    var query = ref.orderByChild('owner').equalTo(auth.uid);

                    return $firebaseArray(query).$loaded();
                },
                sharedEssays: function(auth, $q) {
                    var deferred = $q.defer();

                    var ref = firebase.database().ref().child('user').child(auth.uid);
                    var query = ref.child('sharedEssays');

                    query.once('value', function (snapshot) {
                        deferred.resolve(snapshot.val());
                    });

                    return deferred.promise;
                },
//                 sharedEssays: function ($q, auth, $firebaseArray, sharedLists) {
// //                     var ref = firebase.database().ref().child('user').child(auth.uid);
// //                     var query = ref.child('sharedEssays');
//                     var deferred = $q.defer();
//
//                     var ref = firebase.database().ref().child('essay');
//                     var list = $firebaseArray(ref);
//
//                     // list.$$getRecord(sharedLists).then(function(data) {
//                     //     deferred.resolve(list);
//                     // });
//                     list.$loaded().then(function (data) {
//                         deferred.resolve(list.$getRecord(sharedLists));
//                     });
//
//                     return deferred.promise;
//
// //                     for (var i in sharedLists) {
// //                         var item = sharedLists[i];
//
// //                         var query = ref.;
// //                     }
//                     // return $firebaseArray(query).$loaded();
//                 },
                userEssays: function (ownedEssays, sharedEssays) {
                    return {
                        ownedEssays: ownedEssays,
                        sharedEssays: sharedEssays
                    }
                }
            }
        })
        .state('triangular.channels', {
            url: '/channels',
            templateUrl: 'app/channels/channel.tmpl.html',
            controller: 'ChannelsController',
            controllerAs: 'vm',
            resolve: {
                channels: function (ChannelsFactory) {
                    return ChannelsFactory.$loaded();
                },
                profile: function ($state, Auth, Users){
                    return Auth.$requireSignIn().then(function(auth){
                        return Users.getProfile(auth.uid).$loaded().then(function (profile){
                            if(profile.displayName){
                                return profile;
                            } else {
                                $state.go('profile');
                            }
                        });
                    }, function(error){
                        $state.go('home');
                    });
                }
            }
        })
        .state('triangular.channels.create', {
            url: '/create',
            templateUrl: 'app/channels/channel.create.tmpl.html',
            controller: 'ChannelsController',
            controllerAs: 'vm'
        })
        .state('triangular.channels.messages', {
            url: '/{channelId}/messages',
            templateUrl: 'app/channels/messages.tmpl.html',
            controller: 'MessagesController',
            controllerAs: 'vm',
            resolve: {
                messages: function($stateParams, MessagesFactory){
                    return MessagesFactory.forChannel($stateParams.channelId).$loaded();
                },
                channelName: function($stateParams, channels){
                    return '#'+channels.$getRecord($stateParams.channelId).name;
                }
            }
        })
        .state('triangular.chat', {
            url: '/chat',
            // layout-column class added to make footer move to
            // bottom of the page on short pages
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            },
            templateUrl: 'app/home/chat-page.tmpl.html',
            controller: 'ChatPageController',
            controllerAs: 'vm',
            resolve: {
                auth: function($state, Users, Auth){
                    return Auth.$requireSignIn().catch(function(){
                        // $state.go('triangular.home');
                    });
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Home Module',
            icon: 'fa fa-tree',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Dashboard',
                state: 'triangular.home',
                type: 'link'
            }, {
                name: 'Channels',
                state: 'triangular.channels',
                type: 'link'
            }, {
                name: 'Chat',
                state: 'triangular.chat',
                type: 'link'
            }]
        });
    }
})();
