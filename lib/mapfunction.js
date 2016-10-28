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

///mouse position

var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('coords'),
  undefinedHTML: '&nbsp;'
});


ol2d.addControl(mousePositionControl);  


userConfig.vectorsourcedragdrop=[];
var vectorSource;

var defaultStyle = {
  'Point': [new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: 'rgba(255,255,0,0.5)'
      }),
      radius: 5,
      stroke: new ol.style.Stroke({
        color: '#ff0',
        width: 1
      })
    })
  })],
  'LineString': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#f00',
      width: 3
    })
  })],
  'Polygon': [new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(0,255,255,0.5)'
    }),
    stroke: new ol.style.Stroke({
      color: '#0ff',
      width: 1
    })
  })],
  'MultiPoint': [new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: 'rgba(255,0,255,0.5)'
      }),
      radius: 5,
      stroke: new ol.style.Stroke({
        color: '#f0f',
        width: 1
      })
    })
  })],
  'MultiLineString': [new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#0f0',
      width: 3
    })
  })],
  'MultiPolygon': [new ol.style.Style({
     fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.5)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })]
};

var styleFunction = function(feature, resolution) {
  var featureStyleFunction = feature.getStyleFunction();
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution);
  } else {
    return defaultStyle[feature.getGeometry().getType()];
  }
};


dragAndDropInteraction.on('addfeatures', function(event) {
   vectorSource = new ol.source.Vector({
    features: event.features
    
  });
var title= "drag_vector";
var thetitle="drag_vector";
for (var i=0;i<userConfig.overlayer.length;i++)
{
	
	//var layer=findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
	var checktitle=userConfig.overlayer[i].get("title");
	if(title==checktitle)
	{
		title=thetitle+i;
		
	}
	
}
  
 var vector= new ol.layer.Vector({
 	title:title,
    source: vectorSource,
    style: defaultstyle
 });
   userConfig.overlayer.push(vector);
   

 ol2d.addLayer(vector);
  ol2d.getView().fit(
      vectorSource.getExtent(), /** @type {ol.Size} */ (ol2d.getSize()));

//configureOverlayers();

 var data=$('#data').html(); 

                 html=addnewoverlayer(userConfig.overlayer.length-1,true);
                // configureOverlayers();
                    if(data!=="no data")
                     {
                     	
                      $('#data').html(data+html);
                     
                     }
                     else
                     {
                     	
                     	
                     	$('#zoomtocurrentlayerdata').html(html);
                     	
                     }



});




//pop up function 
/**
 * Elements that make up the popup.

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');



closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};
 */
/**
 * Create an overlay to anchor the popup to the map.


var overlay = new ol.Overlay(({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
}));

ol2d.addOverlay(overlay);
 */
//ol2d.on('click', showmenu);
 
//ol2d.on('singleclick', function(evt){
//	showmenu(evt);
//});

 

/**
 * Add a click handler to the map to render the popup.
ol2d.on('singleclick', function(evt) {
	//alert("good");
  var coordinate = evt.coordinate;
     $("#popupinformation").html("coordinate");
  
   popupinformation.dialog('open'); 

  //alert(coordinate);
  var features = [];
   ol2d.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
   	
    features.push(feature);
  });
  if (features.length > 0) {
  	
    var info = [];
    var i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
   content.innerHTML = info.join(', ') || '&nbsp';
  //content.innerHTML="good0";
   overlay.setPosition(coordinate);
  
   //////////////////
   

   
   /////////////////////
  } else {
    //content.innerHTML = '&nbsp;';
   //overlay.setPosition(coordinate);
  }
  
   */
  
 /* var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
      coordinate, 'EPSG:3857', 'EPSG:4326'));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
      '</code>';
  overlay.setPosition(coordinate);


});*/
function removedragdroplayer()
{  
	for (i = 0, ii = userConfig.overlayer.length; i < ii; ++i) {
            $("#tr"+i).css('display','none');
           

	         userConfig.overlayer[i].setVisible(false);	
	        }

	
}



function removelayerbycitydb()
{
	
	// var layer = findBy(ol2d.getLayerGroup(), 'Data of '+citydbname);
	
	 for(var i=0;i<userConfig.overlayer.length;i++) {
           if(userConfig.overlayer[i].get("title") === citydbname) {
           	// userConfig.overlayerbackup.push(userConfig.overlayer[i]);
           	//document.getElementById("tr"+i).style.height="0px";
           	$("#tr"+i).css('display','none');

	         userConfig.overlayer[i].setVisible(false);	
	         

              }
              
           
        }
       
	 
	 
	// ol2d.removeLayer(layer);
	// configureOverlayers();
	
	
}

function zoomtocurrentlayer(i)
{
	var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
    ol2d.getView().fit(layer.getSource().getExtent(), ol2d.getSize());
    ol3d.warmUp();
	
	
}
function slideropacity(i)
{
	
	 $('#opacity'+userConfig.overlayer[i].get("title")).slider().on('slide', function(ev) {
           // var layername = $(this).closest('li').data('layerid');
            var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
            layer.setOpacity(ev.value);
        });
	
	
}
function removecurrentlayer(i)
{
	 $("#tr"+i).css('display','none');
	 userConfig.overlayer[i].setVisible(false);	
	
}

//var converter=new olcs.FeatureConverter(scene);
