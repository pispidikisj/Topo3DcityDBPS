//userConfig.baselayer contains baselayer of maps
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
userConfig.baselayer=[];

//////////////////////esri mapserver//////////////////////
	var esri_world_imagery=  new ol.layer.Tile({
		preload: Infinity,
		title:"Esri World Imagery",
		visible: false,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileArcGISRest({
      url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    })
 });
    
 userConfig.baselayer.push(esri_world_imagery);
 
 
 	var esri_World_Physical_Map=  new ol.layer.Tile({
		preload: Infinity,
		title:"Esri World Physical Map",
		visible: false,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileArcGISRest({
      url: "http://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer"
    })
 });
    
 userConfig.baselayer.push(esri_World_Physical_Map);
 
 
  	var ESRI_Imagery_World_2D=  new ol.layer.Tile({
		preload: Infinity,
		title:"ESRI Imagery World 2D",
		visible: false,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileArcGISRest({
      url: "http://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer"
    })
 });
    
 userConfig.baselayer.push(ESRI_Imagery_World_2D);
 
 
 
   	var ESRI_World_Topographic_Map=  new ol.layer.Tile({
		preload: Infinity,
		title:"ESRI World Topographic Map",
		visible: false,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileArcGISRest({
      url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
    })
 });
    
 userConfig.baselayer.push(ESRI_World_Topographic_Map);
 /////////////////////////////////////////////////////////


userConfig.baselayer.push(new ol.layer.Tile({
    visible: false,
    preload: Infinity,
    title: 'Osm Road',
    source: new ol.source.OSM()
 }));
 

	
	
	

	
	

