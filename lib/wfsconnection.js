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



function wfslayer()
{    

// format used to parse WFS GetFeature responses
var geojsonFormat = new ol.format.GeoJSON();

var vectorSource = new ol.source.Vector({
  loader: function(extent, resolution, projection) {

  	
    var url = '/geoserver/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename=myworkspace:lod2view&styles=polygon&' +
        'outputFormat=text/javascript&format_options=callback:loadFeatures' +
        '&srsname=EPSG:3857&bbox=' + extent.join(',') + ',EPSG:3857';
    // use jsonp: false to prevent jQuery from adding the "callback"
    // parameter to the URL
    $.ajax({url: url, dataType: 'jsonp', jsonp: false});
  },
  strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
    maxZoom: 19,
    minZoom: 13
  }))
    //strategy: ol.loadingstrategy.bbox(ol2d.getView().calculateExtent(ol2d.getSize()),12
    	
  //  )
  
});


/**
 * JSONP WFS callback function.
 * @param {Object} response The response object.
 */
window.loadFeatures = function(response) {

  vectorSource.addFeatures(geojsonFormat.readFeatures(response));
};

var vector = new ol.layer.Vector({
  source: vectorSource,
  title: "test_wfs"
});



 ol2d.addLayer(vector);
               // var layer = findBy(ol2d.getLayerGroup(),citydbname);
                
                userConfig.overlayer.push(vector);
              
                 var data=$('#data').html(); 

                 html=addnewoverlayer(userConfig.overlayer.length-1,true);
                // configureOverlayers();
                    if(data!=="no data")
                     {
                      $('#data').append(html);
                     }
                     else
                     {
                     	$('#data').html(html);
                     }
	
	
	
	
	
}//function wfslayer

