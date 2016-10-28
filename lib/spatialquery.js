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




var draw; // global so we can remove it later

var drawsource = new ol.source.Vector({wrapX: false});

var drawvector = new ol.layer.Vector({
	title:"drawvector",
  source: drawsource,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.4)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 4
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});

ol2d.addLayer(drawvector);



function spatialqueryexecute(sel)
{     
	// var layer = findBy(ol2d.getLayerGroup(), "drawvector");
	  ol2d.removeInteraction(draw);
	  // ol2d.removeLayer(layer);
	  drawsource.clear();
      addInteraction(sel);
      

}



function addInteraction(sel) {
  var value = sel.value;
  if (value !== 'Select') {
    var geometryFunction, maxPoints;
    if (value === 'Square') {
      value = 'Circle';
      geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
    } else if (value === 'Box') {
      value = 'LineString';
      maxPoints = 2;
      geometryFunction = function(coordinates, geometry) {
        if (!geometry) {
          geometry = new ol.geom.Polygon(null);
        }
        var start = coordinates[0];
        var end = coordinates[1];
        geometry.setCoordinates([
          [start, [start[0], end[1]], end, [end[0], start[1]], start]
        ]);
        return geometry;
      };
    }
    draw = new ol.interaction.Draw({
      source: drawsource,
      type: /** @type {ol.geom.GeometryType} */ (value),
      geometryFunction: geometryFunction,
      maxPoints: maxPoints
    });
    ol2d.addInteraction(draw);
     draw.on('drawstart', function(event) {
     	if(value!=="Point")
     	{
     	drawsource.clear();
     	}
     	
     	});
    draw.on('drawend', function(event) {
    	//event.feature.getGeometry().getCoordinates()
      executespatialquery(event.feature,sel.value);
  // alert(event.feature.getGeometry().getCoordinates());
    //console.log(pp);
});
  
  }
}

function executespatialquery(coords,type)
{   //500168.34215504455,6783347.821473784
	//500076.17980062764,6783394.4002878945,500150.82533606235,6783433.215966321,500284.5901355614,6783316.768931042,500194.6173835174,6783236.151752773,500094.2937838931,6783277.953252616,500070.407212554,6783343.641323798,500076.17980062764,6783394.4002878945
	//alert(coords);
	
var lod=$('#selectedlodspatialquery').val();
if(lod==0)
    {
    messagealert("You dont select lod","ATTETION!");

     }
    else
     {	
     var wktFormat = new ol.format.WKT();
     var features = wktFormat.writeFeature(coords);
     querybuildingsdetail3dcitydb(features,type,lod);
      }	
 }

function querybuildingsdetail3dcitydb(coord,type,lod){
    
    var html="<hr>";
    var thebuildingsid=[];
    
     $.post('phplib/requestdata.php?request=20',{coord:coord,type:type},function(buildingsid){
     	
       if(buildingsid==0)
       {
       	
       	SpatialqueriesConnect("There is no building available!");
       	 
       }
       else
       {
     	  var parsed = JSON.parse(buildingsid);
         

           for(var x in parsed){
           	
               thebuildingsid.push(parsed[x]);
              
              }
              if(thebuildingsid.length==1)
                {
                html+="<b><u>There is "+thebuildingsid.length+" building</u></b></br>";	
                	
                }
                else
                {
                 html+="<b><u>There are "+thebuildingsid.length+" buildings</u></b></br>";	
                	
                }
                
              
              html+="<table style='margin:auto; text-align:center;max-height: 250px; overflow-y: scroll;'>";
              html+='<tr style="background-color: rgba(188, 120, 32, 0.88);">';
                   html+="<td>";
                   html+="</td>";
                   html+="<td>Building id";
                   html+="</td>";
                   html+='<td style="text-align: center;" colspan=2>tools';
                   html+="</td>";
                   html+="<td style='text-align: center;' colspan=3>semantics";
                   html+="</td>";
              html+="</tr>";
              for(var i=0;i<thebuildingsid.length;i++)
              {
              	html+="<tr>";
              	html+="<td>"+(i+1)+"</td>";
              	html+='<td>building: '+thebuildingsid[i]+"</td>";
              	html+='   <td ><img id="building_'+i+'" onclick="addnewoverlayerforbuildingdetail('+thebuildingsid[i]+','+lod+')" src="images/add16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add building: '+thebuildingsid[i]+'"></img></td>';
              	html+='   <td><img id="building_'+i+'" onclick="infoforbuilding('+thebuildingsid[i]+','+lod+')" src="images/info16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Information for building: '+thebuildingsid[i]+'"></img></td>';
              	////////////////////////////////////////////////////////////////////////////////////////
             	html+='   <td ><img id="opening_'+i+'" onclick="addopening('+thebuildingsid[i]+','+lod+')" src="images/opening.jpg" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add opening data"></img></td>';
              	html+='   <td><img id="installation_'+i+'" onclick="addinstallation('+thebuildingsid[i]+','+lod+')" src="images/building_installation.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add installation"></img></td>';
              	html+='   <td><img id="room_'+i+'" onclick="addroom('+thebuildingsid[i]+','+lod+')" src="images/room.jpg" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add room data"></img></td>';
                  	
              	
              	
              	
              	html+='</tr>';

              }
              
              html+='</table>';

            // html+=thebuildingsid[0];

             SpatialqueriesConnect('<div style="max-height: 170px; overflow-y: scroll; margin:auto; text-align:center;">'+html+'</div>');
           //  $('#numberofbuidings').html(html);      
         }
     });
    



}

function checkandselectlodforquery(sel)
{      // var data=$('#lodbuilding').html();

if(sel.value==0)
  {
  	document.getElementById("selectedquery").style.visibility='hidden';
  	// ol2d.removeInteraction(draw);
  	
  }
  else
    {
		 $.post('phplib/requestdata.php?request=3',{lod:sel.value},function(result){
      	   
      	    if(result!=="0")
      	     {
      	     	document.getElementById("selectedquery").style.visibility='visible';
      	     	
      	     	// ol2d.addInteraction(draw);
      	     	
      	     }
      	     else{
      	     	document.getElementById("selectedquery").style.visibility='hidden';
      	     	messagealert("No surface data in lod"+sel.value,"ATTETION!");
      	     	// ol2d.removeInteraction(draw);
      	     }
      	 });
	
	
	}
	
}



