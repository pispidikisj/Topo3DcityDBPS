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

//Proj4js.defs["EPSG:2100"] = "+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=-199.87,74.79,246.62,0,0,0,0 +units=m +no_defs";
var projection = ol.proj.get('EPSG:3857');


///////////////////////interaction//////////////////////

var dragAndDropInteraction = new ol.interaction.DragAndDrop({
  formatConstructors: [
    ol.format.GPX,
    ol.format.GeoJSON,
    ol.format.IGC,
    ol.format.KML,
    ol.format.TopoJSON
    
  ]
});



var alllayers=[];

var ol2d = new ol.Map({
  layers: userConfig.baselayer,
  interactions: ol.interaction.defaults().extend([dragAndDropInteraction]),
  controls: ol.control.defaults({
    attributionOptions:({
      collapsible: true
    })
    
  }),
  target: 'map',
  view: new ol.View({
  //	projection:projection,
   center: ol.proj.transform([22 ,40], 'EPSG:4326', 'EPSG:3857'),
   //center: ol.proj.transform([23.75 ,37.96], 'EPSG:4326', 'EPSG:3857'),
   // projection: 'EPSG:4326',

    //center:[39,21],
    zoom: 5
  })
});




var terrainbutton=new ol.control.terrainprovider(ol2d); 
var spatialbutton=new ol.control.spatialquery(ol2d); 
ol2d.addControl(spatialbutton); 
ol2d.addControl( new ol.control.ScaleLine({
      units: 'metric'
    }));
ol2d.addControl( new ol.control.OverviewMap());     
//ol2d.addControl(new ol.control.ZoomSlider());  
ol2d.addControl(new ol.control.FullScreen());  
ol2d.addControl(new ol.control.homeextent(ol2d)); 

/////////////////////////3d

 var viewer;   
var ol3d = new olcs.OLCesium({map: ol2d});
scene = ol3d.getCesiumScene();


 var ol3dnew = new olcs.OLCesium({map: ol2d, target: 'map3dmap'});
var scenenew = ol3dnew.getCesiumScene();

ol2d.addControl(new ol.control.threeDControl(ol3d)); 



//var terrainProvider = new Cesium.CesiumTerrainProvider({
//    url : '//assets.agi.com/stk-terrain/world',
//	requestWaterMask: true
//});

var terrainProvider = new Cesium.CesiumTerrainProvider({
  url : '//assets.agi.com/stk-terrain/world'
});
scene.terrainProvider = terrainProvider;
//scene.globe.depthTestAgainstTerrain = false;



//ol3d.getDataSources().add(Cesium.KmlDataSource.load('ZappeiomegaroAthens.kml'));



