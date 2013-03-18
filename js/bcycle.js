
        $(document).ready(function(){
       
            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            var map;
            
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
            }
            
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
         
             
            initialize();
           $("#getRoute").click(function(){
            calcRoute();
                });//end getRoute click
                });//end ready

