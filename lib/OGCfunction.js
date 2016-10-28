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



function addworkspace()
{      var selectionlayer = document.getElementById('selectedlayer');
  	   var selection = document.getElementById('selectedworkspace');
    var selectionstore = document.getElementById('selectedstore');
	var geoserverurl=$("#geoserverurl").val();
	if(geoserverurl=="")
	{
		messagealert("There is no URL input","ATTENTION!");
		
	}//if(geoserverurl=="")
	else
	{
	$.get(geoserverurl+"rest/workspaces.json").done(function(response) {

		var workspaces=response.workspaces.workspace;
		    selectionstore.innerHTML = "";
		    selectionstore.add(new Option("-", "-"));
		    selectionlayer.innerHTML = "";
		    selectionlayer.add(new Option("-", "-"));
		selection.innerHTML = "";
		selection.add(new Option("Select Workspace", "Select Workspace"));
		//var obj = JSON.parse(response);
		   for (var key in workspaces){
		      //  alert(obj['workspaces']['workspace']);
		      
		        selection.add(new Option(workspaces[key].name, workspaces[key].name));
		      
		      }// for (var key in response)
		
	    })//done(function()
	    .fail(function()
	    {
	    	selection.innerHTML = "";
		    selection.add(new Option("-", "-"));
		    selectionstore.innerHTML = "";
		    selectionstore.add(new Option("-", "-"));
	    	messagealert("Connection Fail","ATTENTION!");
	    	
	    }//fail(function()
	    ); //$.get('geoserverurl'+"rest/workspaces.json").then(function(response)   
		
		
	}//else
	
	

	
}//function addworkspace()

function Geoserverchangevalueofworkspace(sel)
{   var selectionstore = document.getElementById('selectedstore');
    var selectionlayer = document.getElementById('selectedlayer');
    var geoserverurl=$("#geoserverurl").val();
	if(geoserverurl=="")
	{
		messagealert("There is no URL input","ATTENTION!");
		
	}//if(geoserverurl=="")
	else
	{
	$.get(geoserverurl+"rest/workspaces/"+sel.value+"/datastores.json").done(function(response) {
		
	    var stores=response.dataStores.dataStore;
	    
	    selectionstore.innerHTML = "";
	    
		selectionstore.add(new Option("Select Store", "Select Store"));
		 for (var key in stores){
		      //  alert(obj['workspaces']['workspace']);
		      
		        selectionstore.add(new Option(stores[key].name, stores[key].name));
		      
		      }// for (var key in response)
	
	}).fail(function()
	{
		    selectionstore.innerHTML = "";
		    selectionstore.add(new Option("-", "-"));
		    selectionlayer.innerHTML = "";
		    selectionlayer.add(new Option("-", "-"));
	    	messagealert("Connection Fail","ATTENTION!");
		
	});
	
	}//else
	
}//function Geoserverchangevalueofstores(sel)

function Geoserverchangevalueofstore(sel)
{//
	var selectionworkspace=$('#selectedworkspace').val();
	 var selectionlayer = document.getElementById('selectedlayer');
	 var selectionstore = $('#selectedstore').val();

    var geoserverurl=$("#geoserverurl").val();
    
	if(geoserverurl=="")
	{
		messagealert("There is no URL input","ATTENTION!");
		
	}//if(geoserverurl=="")
	else
	{
	$.get(geoserverurl+"rest/workspaces/"+selectionworkspace+"/datastores/"+sel.value+"/featuretypes.json").done(function(response) {
		
	    var layers=response.featureTypes.featureType;
	    
	    selectionlayer.innerHTML = "";
		selectionlayer.add(new Option("Select Layer", "Select Layer"));
		 for (var key in layers){
		      //  alert(obj['workspaces']['workspace']);
		      
		        selectionlayer.add(new Option(layers[key].name, layers[key].name));
		      
		      }// for (var key in response)
	
	}).fail(function()
	{
		    selectionlayer.innerHTML = "";
		    selectionlayer.add(new Option("-", "-"));
	    	messagealert("Connection Fail","ATTENTION!");
		
	});
	
	}//else
	
	
	
}//function Geoserverchangevalueoflayer(sel)


function AddOgcLayers(geoserverurl,workspace,store,layer,ogc){
	
	if(ogc=="WMS")
	  {
	  	
//checkname
              var checking=false; 
              var checkname="WMS_"+workspace+'_'+layer;
            //alert(buildings.length);
              for(var i=0;i<userConfig.overlayer.length;i++)
      	      {
      	    	if(userConfig.overlayer[i].get("title")===checkname)
      	    	{
      	    		checking=true;
      	    		
      	    	}
      	      }//for(var i=0;i<userConfig.overlayer.length;i++)
      	      
      	      if(checking==true)
             	{
             		
                    for(var j=0;j<userConfig.overlayer.length;j++)
      	               {
      	               	  if(userConfig.overlayer[j].get("title")==checkname)
      	    	             {
                            $("#tr"+j).css('display','block');
                            zoomtocurrentlayer(j);
                           
                            if(document.getElementById("checkbox"+j).checked==true)
  	                           {
                               userConfig.overlayer[j].setVisible(true);	
                                }
                              }
      	               	
      	               }

             	}//if(checking==true)
     
  
  
  /////////////////    	  	
	   if(checking==false)
      	        { 	
	  	
	  	var mylayer= new ol.layer.Tile({
	title:"WMS_"+workspace+'_'+layer,
   // extent: [23.7558830002859,37.9693964210029,23.7566755911988,37.9699165146207],
    source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
      url: geoserverurl+workspace+'/wms',
      params: {
        'VERSION': '1.1.1','LAYERS': workspace+':'+layer, 'TILED': true
     /*"version":"1.1.1",
     "format":"application/vnd.google-earth.kml+xml",
     "layers":"myworkspace:examplecitydb",
     //"height":"2048",
    // "width":"2048"
     "transparent":"true",
     "srs":"EPSG:4326",
     "format_options":"AUTOFIT:true;KMATTR:true;KMPLACEMARK:true;KMSCORE:100;MODE:refresh;SUPEROVERLAY:true;"*/
                   },
      serverType: 'geoserver'
    }))
  });


 ol2d.addLayer(mylayer);
  userConfig.overlayer.push(mylayer);
              
                 var data=$('#data').html(); 

                 html=addnewoverlayerWMS(userConfig.overlayer.length-1,true);
                // configureOverlayers();
                    if(data!=="no data")
                     {
                      $('#data').append(html);
                     }
                     else
                     {
                     	$('#data').html(html);
                     }
	  	
	  	
	  	
	  	
	  	}//  if(checking==false)
	  	
	  	
	  	
	  	
	  }//if(ogc=="WMS")
	 else if(ogc=="WFS")
	 {

                    
                    
  //checkname
              var checking=false; 
              var checkname="WFS_"+workspace+'_'+layer;
            //alert(buildings.length);
              for(var i=0;i<userConfig.overlayer.length;i++)
      	      {
      	    	if(userConfig.overlayer[i].get("title")===checkname)
      	    	{
      	    		checking=true;
      	    		
      	    	}
      	      }//for(var i=0;i<userConfig.overlayer.length;i++)
      	      
      	      if(checking==true)
             	{
             		
                    for(var j=0;j<userConfig.overlayer.length;j++)
      	               {
      	               	  if(userConfig.overlayer[j].get("title")==checkname)
      	    	             {
                            $("#tr"+j).css('display','block');
                            zoomtocurrentlayer(j);
                           
                            if(document.getElementById("checkbox"+j).checked==true)
  	                           {
                               userConfig.overlayer[j].setVisible(true);	
                                }
                              }
      	               	
      	               }

             	}//if(checking==true)
     
  
  
  /////////////////    
  
              if(checking==false)
      	        { 
      	        	
      	       	 	
    
     // $.ajax(geoserverurl+workspace+'/ows?service=WFS&version=1.1.0&request=GetFeature&typeName='+workspace+':'+layer+'&outputFormat=application/json').then(function(response) {
 	             // format used to parse WFS GetFeature responses
var geojsonFormat = new ol.format.GeoJSON();

var vectorSource = new ol.source.Vector({
  loader: function(extent, resolution, projection) {

    var url = geoserverurl+workspace+'/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename='+workspace+':'+layer+'&' +
        'outputFormat=text/javascript&format_options=callback:loadFeatures' +
        '&srsname=EPSG:3857&bbox=' + extent.join(',') + ',EPSG:3857';
    // use jsonp: false to prevent jQuery from adding the "callback"
    // parameter to the URL
    $.ajax({url: url, dataType: 'jsonp', jsonp: false});
   
  },
  strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
    maxZoom: 19
  }))
});


/**
 * JSONP WFS callback function.
 * @param {Object} response The response object.
 */
window.loadFeatures = function(response) {
  //vectorSource.clear();
  vectorSource.addFeatures(geojsonFormat.readFeatures(response));
};

var vector = new ol.layer.Vector({
  title: "WFS_"+workspace+'_'+layer,
  source: vectorSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2
    })
  })
});



 ol2d.addLayer(vector);
               // var layer = findBy(ol2d.getLayerGroup(),citydbname);
                
                userConfig.overlayer.push(vector);
              
                 var data=$('#data').html(); 

                 html=addnewoverlayerWMS(userConfig.overlayer.length-1,true);
                // configureOverlayers();
                    if(data!=="no data")
                     {
                      $('#data').append(html);
                     }
                     else
                     {
                     	$('#data').html(html);
                     }
	

                     
                     

           }//if(checking==false)
	 	
	 	
	 	
	 }//else if(ogc=="WFs
	
	
	
	
}//function AddOgcLayers(geoserverurl,workspace,store,layer,ogc){

function addnewoverlayerWMS(i,check)
{
	
	
	var html='<table>';
	 html+='<tr id="tr'+i+'" fillcolor="ffcc33" strokecolor="000000">';
	    html+="<td>";
	    if(check==true)
	    {
	    html+='<input type="checkbox" id="checkbox'+i+'" name="checkbox" value="'+i+'" checked="checked" onchange="overlayercheck('+i+')"  />';
	    html+='<img id="hover'+i+'"  src="images/hover.jpg" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" onmouseover="changestyleoverhover('+i+')"';
	    html+='onmouseout="changestyleouthover('+i+')""></img>';	
	    }
	    else
	    {
	    	
	    html+='<input type="checkbox" id="checkbox'+i+'" name="checkbox" value="'+i+'" onchange="overlayercheck('+i+')"  />';
	    html+='<img id="hover'+i+'"  src="images/hover.jpg" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer;visibility:hidden;" onmouseover="changestyleoverhover('+i+')"';
	    html+='onmouseout="changestyleouthover('+i+')""></img>';	

	    }
	    html+='</td>';
	    
	    
	     html+="<td style='min-width: 250px;'>";
	    html+=userConfig.overlayer[i].get("title");
	    html+="<br>";
	     var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
	      if(check==true)
	        {
	      html+= '<input class="opacity'+userConfig.overlayer[i].get("title")+'" style="display:block;" type="range" min="0" max="1" step="0.01" value="1" onchange="changeopacity('+i+')"/>';
	      }
	      else
	      {
	      	
          html+= '<input class="opacity'+userConfig.overlayer[i].get("title")+'" style="display:none;" type="range" min="0" max="1" step="0.01" value="1" onchange="changeopacity('+i+')"/>';
    	
	      }
	    
	    
	    html+='</td>';
	    html+="<td>";
	    
	    
	    
	    /*
	    //zoom to currentlayer
	    html+='  <button class="mapButton" title="zoot to: '+userConfig.overlayer[i].get("title")+'" id="'+userConfig.overlayer[i].get("title")+'" onclick="zoomtocurrentlayer('+i+')" style="cursor: pointer"><img src="images/search16.png" style="WIDTH: 9px; HEIGHT: 9px"></img></button>';
	    html+='</td>';
	    //change color
	    html+="<td>";

	    html+='<button class="mapButton" title="change style to: '+userConfig.overlayer[i].get("title")+'" id="'+userConfig.overlayer[i].get("title")+'" onclick="changestyle('+i+')" style="cursor: pointer"><img src="images/draw.png" style="WIDTH: 9px; HEIGHT: 9px"></img></button>';
	    html+='</td>';
	    
	    */
	    
	    //remove button	    
	    html+="<td>";

	    html+='<button class="mapButton" title="remove layer: '+userConfig.overlayer[i].get("title")+'" id="'+userConfig.overlayer[i].get("title")+'" onclick="removecurrentlayer('+i+')" style="cursor: pointer"><img src="images/remove16.png" style="WIDTH: 9px; HEIGHT: 9px"></img></button>';
	    html+='</td>';
	    
	    //zoomtocurrentlayer('+i+')//mapfunction.js
	    ///////end zoom to current layer
	    //slideropacity
	    // html+="<td>";

	    //html+='</td>';
	    
	    
	     html+="</tr>";
	     html+="</table>";
	     
	  
	     
	     
	     //html+='<br />';

        //ol2d.addLayer(userConfig.overlayer[i]); 

	      return html;
}//function addnewoverlayerWMS(i,check)


