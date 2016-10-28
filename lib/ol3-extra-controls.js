/*
 | Copyright 2015 Pispidikis john
 |
 | Licensed under the   GNU GENERAL PUBLIC LICENSE  Version 3
 | you may not use this file except in compliance with the License.
 |
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */


ol.control.spatialquery=function(ol2d)
{
	 var button = document.createElement('button');
     button.innerHTML = '<img title="spatia queries" src="images/query.png" style="WIDTH: 15px; HEIGHT: 15px; "></img>';
	
	 var query = function(e) {
	// toggleallpanel(false);
	
	if ($('#queries').css('display') == 'none')
          {
      $("#queries").css('display','block');
           }
	else
	{
	 $("#queries").css('display','none');
	 	  ol2d.removeInteraction(draw);
	  // ol2d.removeLayer(layer);
	  drawsource.clear();
    }       
            
                     };
  button.addEventListener('click', query, false);
  var element = document.createElement('div');
  element.className = 'query-control ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
  });
  
	
	
};
ol.inherits(ol.control.spatialquery, ol.control.Control);



//terrain provider

ol.control.terrainprovider=function(ol2d)
{
	 var button = document.createElement('button');
     button.innerHTML = '<img title="select terrain" src="images/terrain.png" style="WIDTH: 15px; HEIGHT: 15px"></img>';
	
	 var terrain = function(e) {
	// toggleallpanel(false);
	
	if ($('#terrains').css('display') == 'block')
          {
     toggleterrainsPanel(false);
           }
	else
	{
	 toggleterrainsPanel(true);
    }       
            
                     };
  button.addEventListener('click', terrain, false);
  var element = document.createElement('div');
  element.className = 'terrain-control ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
  });
  
	
	
};
ol.inherits(ol.control.terrainprovider, ol.control.Control);


//homeextend control
ol.control.homeextent=function(ol2d)
{
	 var button = document.createElement('button');
     button.innerHTML = '<img title="home extent" src="images/gis_icons/map_extend.png"></img>';
	
	 var home = function(e) {
	 ol2d.setView(new ol.View({
               center: ol.proj.transform([22 ,40], 'EPSG:4326', 'EPSG:3857'),
   // projection: 'EPSG:4326',

    //center:[39,21],
               zoom: 5
         }));
            
            
                     };
  button.addEventListener('click', home, false);
  button.addEventListener('touchstart', home, false);
  var element = document.createElement('div');
  element.className = 'home-control ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
  });
  
	
	
};
ol.inherits(ol.control.homeextent, ol.control.Control);

//3d-2d control
ol.control.threeDControl = function(ol3d) {

  var button = document.createElement('button');
  button.innerHTML = '2D';

  var enable3DView = function(e) {
      ol3d.setEnabled(!ol3d.getEnabled());
		if(ol3d.getEnabled())
		  {
			button.innerHTML = '3D';
			configuration3dtools();
			
		  }
		else{
			button.innerHTML = '2D';
			configuration2dtools();
			
		 }
  };

  button.addEventListener('click', enable3DView, false);
  button.addEventListener('touchstart', enable3DView, false);

  var element = document.createElement('div');
  element.className = 'enable3d-control ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
  });

};
ol.inherits(ol.control.threeDControl, ol.control.Control);


