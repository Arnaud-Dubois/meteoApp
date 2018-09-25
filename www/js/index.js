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

 // testing
var app = {
    // Application Constructor
    initialize: function() {
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
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        /*
        ***********************************************************************
        GET YOUR GEOLOCATION COORDINATES
        ***********************************************************************
        */
        console.log('/////////////////////////////////////////////////////////')

        

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // // onSuccess Callback
        // // This method accepts a Position object, which contains the
        // // current GPS coordinates
        // //

        // var onSuccess = function(position) {
        //     alert('Latitude: '          + position.coords.latitude          + '\n' +
        //         'Longitude: '         + position.coords.longitude         + '\n' +
        //         'Altitude: '          + position.coords.altitude          + '\n' +
        //         'Accuracy: '          + position.coords.accuracy          + '\n' +
        //         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //         'Heading: '           + position.coords.heading           + '\n' +
        //         'Speed: '             + position.coords.speed             + '\n' +
        //         'Timestamp: '         + position.timestamp                + '\n');
        // };

        // // // onError Callback receives a PositionError object
        // // //
        // // function onError(error) {
        // //     alert('code: '    + error.code    + '\n' +
        // //         'message: ' + error.message + '\n');
        // // }

        // navigator.geolocation.getCurrentPosition(onSuccess);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        
        
        
        function getWeatherLocation() {
            navigator.geolocation.getCurrentPosition
            (onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
        }

        // Success callback for get geo coordinates
        var onWeatherSuccess = function (position) {

            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;

            getWeather(Latitude, Longitude);

            // Show coordinates
            console.log(Latitude)
            console.log(Longitude)
            //alert('Latitude = ' + Latitude)
            //alert('Longitude = ' + Longitude)
        }

        // Get weather by using coordinates
        function getWeather(latitude, longitude) {
            
            // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
            var OpenWeatherAppKey = "f712b5ca29061df2a7f99d02269f26db";

            var queryString =
            'http://api.openweathermap.org/data/2.5/weather?lat='
            + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=metric';

            // var col = $('#card--col');
            var col = $('.card--col');

            var emot = $('#emot');

            $.getJSON(queryString, function (results) {

                 

                if (results.weather.length) {

                    

                    $.getJSON(queryString, function (results) {

                        

                        if (results.weather.length) {

                            // alert('Description = ' + results.name)
                            // alert('Temp = ' + results.main.temp)
                            // alert('Wind = ' + results.wind.speed)
                            // alert('Humidity = ' + results.main.humidity)
                            // alert('Visibility = ' + results.weather[0].main)

                            $('#description').text(results.name);
                            $('#temp').text('Température = ' + results.main.temp);
                            $('#wind').text('Vent = ' + results.wind.speed);
                            $('#humidity').text('Humidité = ' + results.main.humidity);
                            $('#visibility').text('Visibilité = ' + results.weather[0].main);


                            var sunriseDate = new Date(results.sys.sunrise);
                            $('#sunrise').text(sunriseDate.toLocaleTimeString());

                            var sunsetDate = new Date(results.sys.sunset);
                            $('#sunset').text(sunsetDate.toLocaleTimeString());

                            // var sunriseDate = new Date(results.sys.sunrise);
                            $('#timeDate').text(results.sys.time);

                            // Change GFX based on the WEATHER

                            // Testing the weather modss
                            // results.weather[0].main = 'Cold'
                            // 

                            switch(results.weather[0].main) {
                                case 'Rain':
                                    col.addClass("rain");
                                    // emot.innerHTML = '<img style="display:block;margin:0 auto;" src="res/chibi-cloud.svg" alt="chibi-cloud" width="200" height="140"></img>';
                                    emot.html('<img style="display:block;margin:0 auto;" src="res/chibi-cloud-cry.svg" alt="chibi-cloud-cry" width="200" height="140"></img>');
                                    break;
                                case 'Sun':
                                    col.addClass("sun");
                                    emot.html('<img style="display:block;margin:0 auto;" src="res/chibi-sun.svg" alt="chibi-sun" width="200" height="140"></img>');
                                    break;
                                case 'Clouds':
                                    col.addClass("clouds");
                                    emot.html('<img style="display:block;margin:0 auto;" src="res/chibi-cloud.svg" alt="chibi-cloud" width="200" height="140"></img>');
                                    break;
                                case 'Cold':
                                    col.addClass("cold");
                                    emot.html('<img style="display:block;margin:0 auto;" src="res/chibi-cloud.svg" alt="chibi-cloud" width="200" height="140"></img>');
                                    break;
                                case 'Clear':
                                    col.addClass("sun");
                                    emot.html('<img style="display:block;margin:0 auto;" src="res/chibi-cloud.svg" alt="chibi-cloud" width="200" height="140"></img>');
                                    break;
                                case 'Fog':
                                    col.addClass("clouds");
                                    emot.html('<img style="display:block;margin:0 auto;" src="res/chibi-cloud.svg" alt="chibi-cloud" width="200" height="140"></img>');
                                    break;
                                default:
                                    col.addClass("rain");
                            }


                        }

                    });
                }
            }).fail(function () {
                console.log("error getting location");
            });
        }

        // Error callback
        function onWeatherError(error) {
            console.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
            alert(error.code)
            alert(error.message)
        }

        getWeatherLocation();

        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        

    }
};
