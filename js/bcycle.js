$(document).ready(function() {

// **************************************** Delete Function *********************
$(".delete").click(function () {
    $.ajax({
        url: 'backliftapp/finalproject/' + $(this).attr('id'),
        type: 'DELETE',
            success: function() {
                console.log("deleted");
        
            },
            error: function(){
                alert("fail delete");
            }
        });//end get
});//end reset click
// **************************************** Test Function *********************

function test(){

    $.ajax({
    url: 'backliftapp/finalproject',
    type: 'GET',
        success: function(addresses) {
            // $("#outputDiv").append("<div id='"+addresses.id+"'>"+ addresses+ "</div><button class='delete' id='"+addresses.id+"'>delete</button>");
        console.log(addresses);
        },
        error: function(){
            alert("fail get");
        }
    });//end get
}//end test

// **************************************** Origin and Destination Variables *********************

$("#getStarted").click(function(){
$.ajax({
    url: 'backliftapp/finalproject',
    type: 'POST',
    dataType: 'JSON',
    data: {addresses: ["502+Monroe+St.+Nashville+TN+37208", "109+S.+11th+St.+Nashville+TN+37206", "1724+Jefferson+St.+Nashville+TN+37208", "891+7th+Ave.+N+Nashville+TN+38208", "495+4th+Ave.+N+Nashville+TN+37219", "424+Deaderick+St.+Nashville+TN+37219", "314+6th+Ave.+N+Nashville+TN+37219", "425+Church+St.+Nashville+TN+37219", "424+3rd+Ave.+N+Nashville+TN+37201", "204+Commerce+Ave.+Nashville+TN+37201", "106+1st+Ave.+S+Nashville+TN+37201", "480+Music+City+Bikeway+Nashville+TN+37213", "135+3rd+Ave.+Nashville+TN 37201", "187+9th+Ave.+S+Nashville+TN+37203", "16th+Ave.+S+Nashville+TN+37203", "568+11th+Ave.+S+Nashville+TN+37203", "73+Hermitage+Ave.+Nashville+TN+37210", "101+27th+Ave.+S+Nashville+TN+37203", "2079+Wedgewood+Ave.+Nashville+TN+37212", "101+27th+Ave.+S+Nashville+TN+37203", "176+5th+Ave.+S+Nashville+TN+37204"]
},

        success: function(data){
        // test();
        // console.log("success");
        

    },

    error: function(){
        alert("fail post");
    }

})//end post

});//end function

// {  addresses: function (){
  
//                 var collectAddresses = [];
//                     var theAddresses = $(".origin").each(function(){
//                     var allAddresses = $(this).val();
        
//                     collectAddresses.push(allAddresses);
//                     });

//             return collectAddresses;

//             };      
//         },




// addresses: ["502+Monroe+St.+Nashville+TN+37208", "109+S.+11th+St.+Nashville+TN+37206", "1724+Jefferson+St.+Nashville+TN+37208", "891+7th+Ave.+N+Nashville+TN+38208", "495+4th+Ave.+N+Nashville+TN+37219", "424+Deaderick+St.+Nashville+TN+37219", "314+6th+Ave.+N+Nashville+TN+37219", "425+Church+St.+Nashville+TN+37219", "424+3rd+Ave.+N+Nashville+TN+37201", "204+Commerce+Ave.+Nashville+TN+37201", "106+1st+Ave.+S+Nashville+TN+37201", "480+Music+City+Bikeway+Nashville+TN+37213", "135+3rd+Ave.+Nashville+TN 37201", "187+9th+Ave.+S+Nashville+TN+37203", "16th+Ave.+S+Nashville+TN+37203", "568+11th+Ave.+S+Nashville+TN+37203", "73+Hermitage+Ave.+Nashville+TN+37210", "101+27th+Ave.+S+Nashville+TN+37203", "2079+Wedgewood+Ave.+Nashville+TN+37212", "101+27th+Ave.+S+Nashville+TN+37203", "176+5th+Ave.+S+Nashville+TN+37204"]



    // **************************************** Define Variables *************************************


    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    // **************************************** Define Function to Render Map ************************


    function initialize() {

        directionsDisplay = new google.maps.DirectionsRenderer();
        var nashville = new google.maps.LatLng(36.171361, -86.779495);
        var mapOptions = {
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: nashville
        }
        map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
        directionsDisplay.setMap(map);
        geocoder = new google.maps.Geocoder();
    }

    // **************************************** Define Function to Get and Display Directions ********


    function calcRoute() {

        var start = document.getElementById("origin").value;
        var end = document.getElementById("destination").value;
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }

    // **************************************** Load Map *********************************************

    initialize();





    // **************************************** Distance Matrix **************************************


    var geocoder;
    var bounds = new google.maps.LatLngBounds();
    var markersArray = [];




    var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

    function calculateDistances() {


        var origin = $("#origin option:selected").val();
        var destination = $("#destination option:selected").val();

        var service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
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
            deleteOverlays();

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                // addMarker(origins[i], false);
                for (var j = 0; j < results.length; j++) {
                    // addMarker(destinations[j], true);
                    outputDiv.innerHTML += origins[i] + ' to ' + destinations[j] + ': ' + results[j].distance.text + ' in ' + results[j].duration.text + '<br>';
                }
            }
        }
    }

    function addMarker(location, isDestination) {
        var icon;
        if (isDestination) {
            icon = destinationIcon;
        } else {
            icon = originIcon;
        }
        geocoder.geocode({
            'address': location
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                bounds.extend(results[0].geometry.location);
                map.fitBounds(bounds);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: icon
                });
                markersArray.push(marker);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    function deleteOverlays() {
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(null);
            }
            markersArray.length = 0;
        }
    }

    // **************************************** Call Functions on button clicks *********************************************
    $("#getRoute").click(function () {
        calcRoute();
    }); //end getRoute click
    $("#Reset").click(function () {
        // initialize();
    }); //end getRoute click
    $("#Distances").click(function () {
        calculateDistances();
    }); //end getRoute click


}); //end ready