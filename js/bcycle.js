$(document).ready(function() {

    // **************************************** Load Map *********************************************
    initialize();

    // **************************************** Collect Addresses ***************************************

    function getAddresses(x) {

        var collectAddresses = [];
        var theAddresses = $(".origin").each(function() {
            var allAddresses = $(this).val();
            collectAddresses.push(allAddresses);
            for (var i in collectAddresses) {
                if (collectAddresses[i] == x) {
                    collectAddresses.splice(i, 1);
                }
            }
        });

        return collectAddresses;

    };

    // **************************************** Define Variables *************************************

    // var directionsDisplay;
    // var directionsService = new google.maps.DirectionsService();
    // **************************************** Define Function to Render Map ************************

    function initialize() {

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var nashville = new google.maps.LatLng(36.171361, -86.779495);
        var mapOptions = {
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: nashville
        }
        var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
        directionsDisplay.setMap(map);
        geocoder = new google.maps.Geocoder();
    }

    // **************************************** Define Function to Get and Display Directions ********

    // function calcRoute() {
    //     var start = document.getElementById("origin").value;
    //     var end = document.getElementById("destination").value;
    //     var request = {
    //         origin: start,
    //         destination: end,
    //         travelMode: google.maps.TravelMode.DRIVING
    //     };
    //     directionsService.route(request, function (result, status) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             directionsDisplay.setDirections(result);
    //         }
    //     });
    // }

    // **************************************** Distance Matrix **************************************

    var geocoder;

    function calculateDistances() {

        var origin = $("#origin option:selected").val();
        var service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix({
            origins: [origin],
            destinations: getAddresses(origin),
            travelMode: google.maps.TravelMode.BICYCLING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: true,
            avoidTolls: true
        }, callback);

    }

    function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var outputDiv = document.getElementById('outputDiv');
            outputDiv.innerHTML = '';

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;

                for (var j = 0; j < results.length; j++) {

                    // outputDiv.innerHTML += origins[i] + ' to ' + destinations[j] + ': ' + results[j].distance.text + ' in ' + results[j].duration.text + '<br>';
                    // outputDiv.innerHTML += origins[i] + ' to ' + destinations[j] + ': ' + results[j].distance.text + ' in ' + results[j].duration.text + '<br>';

                    // evalDistance(response.rows[i].elements[j].distance.text, destinations[j] + " " +response.rows[i].elements[j].distance.text);
                    sortDistance(response.rows[i].elements[j].distance.text, origins[i] + ' to ' + destinations[j] + ': ' + results[j].distance.text + ' in ' + results[j].duration.text + '<br>');
                }

            }

        }

    }

    // **************************************** Display routes by Distance **************************************************

    function sortDistance(x, y) {
        var oneMile = [];
        var twoMile = [];
        var threeMile = [];

        if (parseFloat(x) > 3) {

            threeMile.push(y);

        }
 else if (parseFloat(x) >= 1) {

            twoMile.push(y);

        }
 else {
            oneMile.push(y);
        }

        var distSelect = $("#distance option:selected").val();

        // if (parseFloat(x)>3 && distSelect == "3Mile")
        if (distSelect == "3Mile") {

            console.log(threeMile);
        }

        // else if(parseFloat(x)>=2.9 && distSelect == "1to3Mile")
        else if (distSelect == "1to3Mile") {

            console.log(twoMile);

        }
 else {
            console.log(oneMile);
        }

    };

    // **************************************** Clear Page ******************************************************************
    function clearPage() {
        $("#outputDiv").html(" ");
    };

    // **************************************** Call Functions on button clicks *********************************************
    $("#Reset").click(function() {
        clearPage();
    });
    //end getRoute click
    $("#Distances").click(function() {
        calculateDistances();
    });
    //end getRoute click

    });
//end ready
