
        
        $(document).ready(function(){

// **************************************** Define Variables *************************************

       
            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            var map;
// **************************************** Define Function to Render Map ************************

            
            function initialize() {

              directionsDisplay = new google.maps.DirectionsRenderer();
              var nashville = new google.maps.LatLng(36.171361,-86.779495);
              var mapOptions = {
                zoom:7,
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
                origin:start,
                destination:end,
                travelMode: google.maps.TravelMode.DRIVING
              };
              directionsService.route(request, function(result, status) {
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

      var origin1 = document.getElementById("Monroe").value;
      var origin2 = document.getElementById("Jefferson").value;
      var destinationA = document.getElementById("11th St").value;
      var destinationB = document.getElementById("Deaderick").value;

      var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
      var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

      // function initialize() {
      //   var opts = {
      //     center: new google.maps.LatLng(55.53, 9.4),
      //     zoom: 10,
      //     mapTypeId: google.maps.MapTypeId.ROADMAP
      //   };
      //   map = new google.maps.Map(document.getElementById('map'), opts);
      //   geocoder = new google.maps.Geocoder();
      // }

      function calculateDistances() {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1, origin2],
            destinations: [destinationA, destinationB],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.imperial,
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
            addMarker(origins[i], false);
            for (var j = 0; j < results.length; j++) {
              addMarker(destinations[j], true);
              outputDiv.innerHTML += origins[i] + ' to ' + destinations[j]
                  + ': ' + results[j].distance.text + ' in '
                  + results[j].duration.text + '<br>';
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
        geocoder.geocode({'address': location}, function(results, status) {
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
            alert('Geocode was not successful for the following reason: '
              + status);
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
           $("#getRoute").click(function(){
            calcRoute();
                });//end getRoute click
           $("#Reset").click(function(){
            initialize();
                });//end getRoute click
           $("#Distances").click(function(){
            calculateDistances();
                });//end getRoute click


                });//end ready

