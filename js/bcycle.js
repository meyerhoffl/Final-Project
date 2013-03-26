$(document).ready(function() {

// **************************************** Load Map *********************************************
    initialize();

// **************************************** Collect Addresses ************************************
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

// **************************************** Change Addresses to Coordinates ***********************

    // function codeAddress(x) {
    //     // for (var i=0; i<x.length; i++){
    //         var address = x;
    //         geocoder.geocode( { 'address': address}, function(results, status) {
    //             if (status == google.maps.GeocoderStatus.OK) {
    //                 // console.log(results[0].geometry.location.kb + ", " + results[0].geometry.location.lb);
    //                 console.log(results[0]);

    //             } else {
    //                 alert("Geocode was not successful for the following reason: " + status);
    //             }
    //         });
    //     // }
    //     // console.log(x);
    //     return x;
    // }

// **************************************** Define Function to Get and Display Directions *********
    // function calcRoute() {
    //     var start = document.getElementById("origin").value;
    //     var end = document.getElementById("destination").value;
    //     var request = {
    //         origin: start,
    //         destination: end,
    //         travelMode: google.maps.TravelMode.DRIVING
    //     };
    //     directionsService.route(request, function(result, status) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             directionsDisplay.setDirections(result);
    //         }
    //     });

    // }
// **************************************** Distance Matrix ****************************************
   

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

                    sortDistance(response.rows[i].elements[j].distance.text, origins[i] + ' to ' + destinations[j] + ': ' + results[j].distance.text + ' in ' + results[j].duration.text + '<br>');
                    
                }

            }

        }

    }

// **************************************** Display routes by Distance *******************************
    function sortDistance(x, y) {
        var oneMile = [];
        var twoMile = [];
        var threeMile = [];

        if (parseFloat(x) > 3) {

            threeMile.push(y);

        } else if (parseFloat(x) >= 1) {

            twoMile.push(y);

        } else {
            oneMile.push(y);
        }

        var distSelect = $("#distance option:selected").val();

      
        if (distSelect == "3Mile") {

            outputDiv.innerHTML += threeMile;
        }

       
        else if (distSelect == "1to3Mile") {

            outputDiv.innerHTML += twoMile;

        } else {
            outputDiv.innerHTML += oneMile;
        }

    };

// **************************************** Elevation ***************************************************
    var elevator;
    var chart;
    var infowindow = new google.maps.InfoWindow();
    var polyline;
    var map


    function initialize() {

        var directionsDisplay = new google.maps.DirectionsRenderer();
        var nashville = new google.maps.LatLng(36.171361, -86.779495);
        var mapOptions = {
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: nashville
        }

        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

        directionsDisplay.setMap(map);

        geocoder = new google.maps.Geocoder();
        // Create an ElevationService.
        elevator = new google.maps.ElevationService();

        // Draw the path, using the Visualization API and the Elevation service.
        
    }


    function drawPath() {

        var originVal = $("#origin option:selected").val().split(",");
        var o1 = parseFloat(originVal[0]);
        var o2 = parseFloat(originVal[1]);
        
        var destinationValues = getAddresses($("#origin option:selected").val());
            
            for (var i=0; i<destinationValues.length; i++){
        
    
                // Create a new chart in the elevation_chart DIV.
                chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));
    
                var origin = new google.maps.LatLng(o1, o2);            
        
                var path = [origin, new google.maps.LatLng(parseFloat(destinationValues[i].split(",")[0]),parseFloat(destinationValues[i].split(",")[1]))];
                    
                
                // Create a PathElevationRequest object using this array.
                // Ask for 256 samples along that path.
                var pathRequest = {
                'path': path,
                'samples': 5
                }
    
                // Initiate the path request.
                elevator.getElevationAlongPath(pathRequest, plotElevation);
                   
            }//end i for loops

console.log(elevationArray);
    }//end drawPath

    // Takes an array of ElevationResult objects, draws the path on the map
    // and plots the elevation profile on a Visualization API ColumnChart.
    // elevationArray=[];
   elevationArray=[];

    function plotElevation(results, status) {
     
        if (status == google.maps.ElevationStatus.OK) {
            
            elevations = results;

            // Extract the elevation samples from the returned results
            // and store them in an array of LatLngs.
            var elevationPath = [];
            var elevationValue = [];
            // alert(elevationValue);
                for (var i = 0; i < results.length; i++) {
                       
                    elevationPath.push(elevations[i].location);    
                    elevationValue.push(elevations[i].elevation); 
                    

                }
                console.log(elevationValue);
                

                    // debugger;

                    // elevationArray.push(elevationPath);             
                    // console.log(results);


            // Display a polyline of the elevation path.
            var pathOptions = { 
                path: elevationPath,
                strokeColor: '#0000CC',
                opacity: 0.4,
                map: map
            }

            polyline = new google.maps.Polyline(pathOptions);
            // Extract the data from which to populate the chart. 
            // Because the samples are equidistant, the 'Sample'
            // column here does double duty as distance along the
            // X axis.
            // var data = new google.visualization.DataTable();

            // data.addColumn('string', 'Sample');
            // data.addColumn('number', 'Elevation');
            //     for (var i = 0; i < results.length; i++) {
            //         data.addRow(['', elevations[i].elevation]);

            //     }


            // // Draw the chart using the data within its DIV.
            // document.getElementById('elevation_chart').style.display = 'block';
            // chart.draw(data, {
            //     width: 640,
            //     height: 200,
            //     legend: 'none',
            //     titleY: 'Elevation (m)'
            // });
        }//end if

    }//end plotElevation
// **************************************** Clear Page ******************************************************************
    function clearPage() {
        $("#outputDiv").html(" ");
    };

// **************************************** Call Functions on button clicks *********************************************
    $("#Reset").click(function() {
        clearPage();
    });
//end Reset click
    $("#Distances").click(function() {
        calculateDistances();
        drawPath();

        
      
    });
//end Distances click

    });
//end ready