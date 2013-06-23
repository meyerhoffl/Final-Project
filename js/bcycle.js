]c]c][c[c[c[c[c
<<<<<<< HEAD
  initialize();

// Change Addresses to Coordinates ******************************************************

  function getCoordinates(x) {
    var address = x;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        coordinates = results[0].geometry.location.jb + ", " + results[0].geometry.location.kb;
        drawPath(coordinates);
      }
      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
=======
// **************************************** Load Map *********************************************
    initialize();

    average = function(a) {
      var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
      for(var m, s = 0, l = t; l--; s += a[l]);
      for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
      return r.deviation = Math.sqrt(r.variance = s / t), r;
    }
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
            var origin = $("#origin option:selected").val();
            var distSelect = $("#distance option:selected").val();
            var max = 0;
            var min = 0;
            if (distSelect == "3Mile") {
                max = 999999999;
                min = 4828
            }else if (distSelect == "1to3Mile") {
                max = 4828
                min = 1609.34
            } else {
                max = 1609.34
            }
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var destination_objects = [];
            var longlat = getAddresses(origin)
            var outputDiv = document.getElementById('outputDiv');
            outputDiv.innerHTML = '';
>>>>>>> 1ba931227ca276a855d95f164e7434e1b2c8269e

// Get Destination for Plotting Elevation ***********************************************

<<<<<<< HEAD
  function getDestinationAddress(){
    $('.route').click(function(){
      destination_address = event.target.id;
      getCoordinates(destination_address);
    });
  }
  function getAddresses(x) {
    var collectAddresses = [];
    var theAddresses = $(".origin").each(function(){
      var allAddresses = $(this).val();
      collectAddresses.push(allAddresses);
      for (var i in collectAddresses) {
        if (collectAddresses[i] == x) {
          collectAddresses.splice(i, 1);
        }
<<<<<<< HEAD
      }
    });
  return collectAddresses;
  };

// Calculate Distance *********************************************************************************

  function submitRoute() {
    var origin = $("#origin option:selected").val();
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: getAddresses(origin),
      travelMode: google.maps.TravelMode.BICYCLING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: true,
      avoidTolls: true
    }, returnDistances);
  }

  function returnDistances(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
=======

    }
    function filter_by_elevation(destinations){
        var originVal = $("#origin option:selected").val().split(",");
        var o1 = parseFloat(originVal[0]);
        var o2 = parseFloat(originVal[1]);
        var max = 0;
        var min = 0;
        var elevationVal = $("#terrain option:selected").val()
        if (distSelect == "flat") {
            max = 10;
        }else if (distSelect == "moderate") {
            max = 50
            min = 10
        } else {
            max = 500
        }
        var filter_elevations = function(){
            var filtered = []
            for (var i=0; i<destinations.length; i++){
                var stddeviation = average(destintions[i].elevations)
                if(stddeviation > max || stddeviation < min) {
                    continue
                }
                filtered.push(destinations[i])
            }
            printDestinations(filtered)
        }
        var afterAsync = _.after(destinations.length, filter_elevations)
        for (var i=0; i<destinations.length; i++){

            // Create a new chart in the elevation_chart DIV.
            chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));

            var origin = new google.maps.LatLng(o1, o2);            

            var path = [origin, new google.maps.LatLng(parseFloat(destinations[i].longlat.split(",")[0]),parseFloat(destinations[i].longlat.split(",")[1]))];
                
            
            // Create a PathElevationRequest object using this array.
            // Ask for 256 samples along that path.
            var pathRequest = {
            'path': path,
            'samples': 5
            }
            var on_success = function(results, status){
                if (status == google.maps.ElevationStatus.OK) {
                    var elevationValue = [];
                // alert(elevationValue);
                    for (var j = 0; j < results.length; j++) { 
                        elevationValue.push(elevations[j].elevation);
                    }
                    destinations[i].elevations = elevationValue;
                }
                afterAsync()
                
            }
            // Initiate the path request.
            elevator.getElevationAlongPath(pathRequest, on_success);
               
        }//end i for loops
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
>>>>>>> 1ba931227ca276a855d95f164e7434e1b2c8269e
        }
    else {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      var outputDiv = document.getElementById('outputDiv');
      outputDiv.innerHTML = '<p class="heading">'+ origins+ ' to: </p>';
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          sortDistance(response.rows[i].elements[j].distance.text,'<span class = "heading">' + destinations[j] + '</span>' + '<br /><span class = "bold">Distance:</span> ' + results[j].distance.text + '.<br /><span class = "bold">Estimated Time:  </span>' + results[j].duration.text + '<p class = "route" id = "'+ destinations[j] +'">Show Route and Elevation Chart</p><br />');
        }
      }
      getDestinationAddress()
    }
  }

// Sort Results by Distance **************************************************************************

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
      if (distSelect == "3Mile") {
        outputDiv.innerHTML += threeMile;
      }
      else if (distSelect == "1to3Mile") {
        outputDiv.innerHTML += twoMile;
      }
      else {
        outputDiv.innerHTML += oneMile;
      }
    };

// Initialize ***************************************************************************************

  var elevator;
  var directionsDisplay =  new google.maps.DirectionsRenderer({'map': map});
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var nashville = new google.maps.LatLng(36.171361, -86.779495);
    var mapOptions = {
      zoom:12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: nashville
    }
    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
    directionsDisplay.setMap(map);
    geocoder = new google.maps.Geocoder();
      // Create an ElevationService.
    elevator = new google.maps.ElevationService();
  }

// Display Route ***************************************************************************************

  function calcRoute(x,y) {
    var request = {
      origin:x,
      destination:y,
      travelMode: google.maps.TravelMode.BICYCLING
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }

  function drawPath(x) {
    var destination = x;
    console.log(destination);
    var destvals = destination.split(",");
    var d1 = parseFloat(destvals[0]);
    var d2 = parseFloat(destvals[1]);
    var origin = $("#origin option:selected").val();
    console.log(origin);
    var origvalues = origin.split(",");
    var o1 = parseFloat(origvalues[0]);
    var o2 = parseFloat(origvalues[1]);
    // Create a new chart in the elevation_chart DIV.
    chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));
    var origin = new google.maps.LatLng(o1, o2);
    var finaldest = new google.maps.LatLng(d1, d2);
    var path = [origin, finaldest];
    // Create a PathElevationRequest object using this array.
    // Ask for 256 samples along that path.
    var pathRequest = {
      'path': path,
      'samples': 50
    }
     // Initiate the path request.
    elevator.getElevationAlongPath(pathRequest, plotElevation);
    calcRoute(origin, destination);
  }

  // Takes an array of ElevationResult objects, draws the path on the map
  // and plots the elevation profile on a Visualization API ColumnChart.
  function plotElevation(results, status) {
    if (status == google.maps.ElevationStatus.OK) {
      elevations = results;
      // Extract the elevation samples from the returned results
      // and store them in an array of LatLngs.
      var elevationPath = [];
      for (var i = 0; i < results.length; i++) {
        elevationPath.push(elevations[i].location);
      }
      // Display a polyline of the elevation path.
      // var pathOptions = {
      //     path: elevationPath,
      //     strokeColor: '#0000CC',
      //     opacity: 0.4,
      //     map: map
      // }

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Sample');
      data.addColumn('number', 'Elevation');
      for (var i = 0; i < results.length; i++) {
        data.addRow(['', elevations[i].elevation]);
      }
      // Draw the chart using the data within its DIV.
      document.getElementById('elevation_chart').style.display = 'block';
        chart.draw(data, {
          width: 640,
          height: 200,
          legend: 'none',
          titleY: 'Elevation (m)'
        });
      }
    }

// Clear Page ******************************************************************

<<<<<<< HEAD
=======
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

    }//end drawPath

    // Takes an array of ElevationResult objects, draws the path on the map
    // and plots the elevation profile on a Visualization API ColumnChart.
  

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
>>>>>>> 1ba931227ca276a855d95f164e7434e1b2c8269e
    function clearPage() {
      $("#outputDiv").html(" ");
    };

// Call Functions on button clicks *********************************************

  $("#Reset").click(function() {
    clearPage();
  }); //end Reset click
  $("#Distances").click(function() {
    submitRoute();
  }); //end Distances click
}); //end ready
