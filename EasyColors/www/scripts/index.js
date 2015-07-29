// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        $(document).ready(function () {
            //Materialize.toast('I am a toast!', 3000);
            randomColor();

            $('#colors').submit(function (event) {
                event.preventDefault();
                randomColor();
            });
        });

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function randomColor() {
        var color = '#' + Math.random().toString(16).substr(-6).toLocaleUpperCase();
        
        $('body').css('background-color', color);

        $('#hex').val(color);

        $('#rgb').val(getRGB(color));
    };

    function getRGB(hex) {
        var bigint = parseInt(hex.replace('#',''), 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        
        return 'rgb(' + r + "," + g + "," + b + ')';
    }

} )();