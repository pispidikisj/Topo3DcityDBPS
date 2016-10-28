

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Overlays within Street View</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }

    </style>
  </head>
  <body>

    <div id="map"></div>


<?php

if (isset($_GET['lat']) && isset($_GET['lng'])) 
{
	
	$lat=$_GET['lat'];
	$lng=$_GET['lng'];

?>	
 <script>
var panorama;
function initMap() {
	

	
  var astorPlace = {lat: <?php  echo $lat ?>, lng:<?php echo $lng ?> };

  // Set up the map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: astorPlace,
    zoom:25,
    streetViewControl: true,
     mapTypeId: google.maps.MapTypeId.HYBRID
  });


  panorama = map.getStreetView();
  //alert(panorama);
  
  panorama.setPosition(astorPlace);
  //alert(panorama.getLocation());
  panorama.setPov(/** @type {google.maps.StreetViewPov} */({
    heading: 0,
    pitch: 0
  }));
   panorama.setVisible(true);
  // var panoramaDisplayed = panorama.getVisible();
 

}




  </script>
    <script
        src="https://maps.googleapis.com/maps/api/js?signed_in=false&callback=initMap"
        async defer>
    </script>
<?php
}

?>    
	
  </body>
</html>

