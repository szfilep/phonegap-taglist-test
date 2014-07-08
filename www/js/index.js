/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
	window.localStorage.clear();
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.initPushwoosh();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    initPushwoosh: function() {
        var pushNotification = window.plugins.pushNotification;
        pushNotification.onDeviceReady();

        pushNotification.registerDevice({ projectid: "785944098897", appid: "CFE75-312BB" },
            function (status) {
                var pushToken = status;
                console.warn('Registered push token: ' + pushToken);

                var device = window.device;
                console.warn('Device Cordova: '     + device.cordova);
                console.warn('Device UUID: '     + device.uuid);
                console.warn('Device Platform: ' + device.platform);
                console.warn('Device Version: '  + device.version);
                console.warn('Device Model: '    + device.model);

                setTimeout(app.getChannelTags, 1000);


//                setTimeout(app.setChannelTags, 2000, ["A", "B"]);
//                setTimeout(app.getChannelTags, 4000);
//
//                setTimeout(app.setChannelTags, 6000, ["C", "D", "E"]);
//                setTimeout(app.getChannelTags, 8000);
//
//                setTimeout(app.setChannelTags, 10000, ["F"]);
//                setTimeout(app.getChannelTags, 12000);

            },
            function (status) {
                console.warn(JSON.stringify(['failed to register ', status]));
            }
        )

        document.addEventListener('push-notification', function(event) {
            var title = event.notification.title;
            var userData = event.notification.userdata;

            if(typeof(userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }

            alert(title);
        });
    },

    setChannelTags: function(data) {
        console.warn("Settings tags: "+JSON.stringify(data));

        var pushNotification = window.plugins.pushNotification;

        pushNotification.setTags({ "channels": data },
        function(status2) {
            console.warn("Tags are set. Message: "+JSON.stringify(status2));
        },
        function(status2) {
            console.warn("ERROR while setting tags: "+JSON.stringify(status2));
        });

    },

    getChannelTags: function(){
        console.warn("Getting tags...");

        var pushNotification = window.plugins.pushNotification;

        pushNotification.getTags(
            function(status3) {
                console.warn("Current tags: "+JSON.stringify(status3));
                alert("Current tags: "+JSON.stringify(status3));
            },
            function(status3) {
                console.warn("ERROR while get tags: "+JSON.stringify(status3));
            }
        );
    }

};
