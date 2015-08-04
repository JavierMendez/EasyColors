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

            randomColor();

            $('#colors').submit(function (event) {
                event.preventDefault();

                //if (validateField('hex', false)) {
                //    $('body').css('background-color', $('#hex').val());
                //    $('#rgb').val(getRGB($('#hex').val()));
                //}

                //if (validateField('rgb', false)) {
                //    $('body').css('background-color', getHex($('#rgb').val()));
                //    $('#hex').val(getHex($('#rgb').val()));
                //}

                generarColores();

            });

            $('#hex').on('change', function () {

                var colorHex = $('#hex').val();
                if (validateField('hex',true)) {
                    generarColores(colorHex, null);
                }                

            });

            $('#rgb').on('change', function () {

                var colorRGB = $('#rgb').val();
                if (validateField('rgb',true)) {
                    generarColores(null, colorRGB);
                }
                
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

        changeColors($('body'));
    };

    function getRGB(hex) {
        var bigint = parseInt(hex.replace('#',''), 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        
        return 'rgb(' + r + "," + g + "," + b + ')';
    }

    function getHex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
         (("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)).toLocaleUpperCase() : '';
    };

    function validateField(field, showToast) {
        var valid = true;
        var regex = '';

        regex = field == 'hex' ? /^#[A-Fa-f0-9]{6}$/ : /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;

        if (!$('#' + field).val().match(regex)) {
            $('#' + field).val('');
            if (showToast) {
                Materialize.toast('Wrong format value!', 1500);
            }
            valid &= false;
        }

        return valid;
    }

    function changeColors(element) {
        //Based on colourBrightness.js by @jamiebrittain
        var e, t, n, r, i = element.css("background-color");
        if (i.match(/^rgb/)) {
            i = i.match(/rgb\(([^)]+)\)/)[1];
            i = i.split(/ *, */).map(Number);
            e = i[0];
            t = i[1];
            n = i[2]
        } else if ("#" == i[0] && 7 == i.length) {
            e = parseInt(i.slice(1, 3), 16);
            t = parseInt(i.slice(3, 5), 16);
            n = parseInt(i.slice(5, 7), 16)
        } else if ("#" == i[0] && 4 == i.length) {
            e = parseInt(i[1] + i[1], 16);
            t = parseInt(i[2] + i[2], 16);
            n = parseInt(i[3] + i[3], 16)
        }
        r = (e * 299 + t * 587 + n * 114) / 1e3;
        r < 125 ? element.removeClass('light').addClass('dark') : element.removeClass('dark').addClass('light')
        r < 125 ? $('label').removeClass('light').addClass('dark') : $('label').removeClass('dark').addClass('light')
    }

    function generarColores(colorHex, colorRGB) {

        if (colorHex === null) {

            if ($('#rgb').is(':valid')) {

                $('#hex').val(getHex(colorRGB));

                $('body').css('background-color', colorRGB);
            }
        }

        if (colorRGB === null) {

            if ($('#hex').is(':valid')) {

                var colorGlobalRGB = getRGB(colorHex);

                $('#rgb').val(colorGlobalRGB);

                $('body').css('background-color', colorHex);
            }
        }

        changeColors($('body'));
    }

} )();