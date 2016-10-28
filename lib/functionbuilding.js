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


function checkandselectlod(sel)
{       var data=$('#lodbuilding').html();
    if(sel.value==0)
     {
     	
    document.getElementById("buttonpreviewdetails").style.visibility='hidden';
    document.getElementById("buttonpreview").style.visibility='hidden';
    var openinglayer= $("#openinglayer");
    var roomlayer= $("#roomlayer");
    var infolayer=$("#infolayer");
    $('#numberofbuidings').html(""); 
    openinglayer.dialog('close');
    roomlayer.dialog('close');
     infolayer.dialog('close');
     	
     }
     else
     {
     

		 $.post('phplib/requestdata.php?request=3',{lod:sel.value},function(result){
      	   
      	    if(result!=="0")
      	     {
      	     	document.getElementById("buttonpreview").style.visibility='visible';
      	     	document.getElementById("buttonpreviewdetails").style.visibility='visible';
      	     	$('#numberofbuidings').html(""); 
      	     	var infolayer=$("#infolayer");
      	     	infolayer.dialog('close');
      	     	//$("#buttonpreview").css('visibility','visible');
          //$('#lodbuilding').html(data+html);
      	     	
      	     }
      	     else{
      	     	document.getElementById("buttonpreviewdetails").style.visibility='hidden';
      	     	document.getElementById("buttonpreview").style.visibility='hidden';
      	     	var openinglayer= $("#openinglayer");
      	     	var roomlayer= $("#roomlayer");
      	     	var infolayer=$("#infolayer");
      	     	$('#numberofbuidings').html(""); 
      	     	  openinglayer.dialog('close');
      	     	  roomlayer.dialog('close');
      	     	  infolayer.dialog('close');
      	     	messagealert("No surface data in lod"+sel.value,"ATTETION!");
      	     	
      	     }
      	 });
	
	}
	
	
}
function findBy(layer, value) {
        name = layer.get('title');
        if (name === value) {
            return layer;
        }
        if (layer.getLayers) {
            var layers = layer.getLayers().getArray();
            var len = layers.length, result;
            for (var j = 0; j < len; j++) {
                result = findBy(layers[j], value);
                if (result) {
                    return result;
                }
            }
        }
        return null;
 }
    
    
function hexToR(h) { return parseInt((cutHex(h)).substring(0,2),16); }
function hexToG(h) { return parseInt((cutHex(h)).substring(2,4),16); }
function hexToB(h) { return parseInt((cutHex(h)).substring(4,6),16); }
function cutHex(h) { return (h.charAt(0)=="#") ? h.substring(1,7) : h;}

function changeinputfillcolor(sel)
{
     userConfig.style.fillcolor=sel.value;
     changethestyle(userConfig.style.currentlayerid,userConfig.style.fillcolor,userConfig.style.strokecolor);
	$("#tr"+userConfig.style.currentlayerid).attr('fillcolor',userConfig.style.fillcolor);
	
}
function changeinputstrokecolor(sel)
{
	 userConfig.style.strokecolor=sel.value;
	 changethestyle(userConfig.style.currentlayerid,userConfig.style.fillcolor,userConfig.style.strokecolor);
	 $("#tr"+userConfig.style.currentlayerid).attr('strokecolor',userConfig.style.strokecolor);
	
}


function changestyleoverhover(i)
{
	
	changethestyle(i,"000000","000000");
	
	
}

function changestyleouthover(i)
{
	var fillcolor=$("#tr"+i).attr('fillcolor');
	var strokecolor=$("#tr"+i).attr('strokecolor');
	changethestyle(i,fillcolor,strokecolor);
	
	
}


function changestyleoflayer(i)
{
    var nameoflayer=userConfig.overlayer[i].get("title");
	var layer=findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
	

	$("#changefillcolor").val($("#tr"+i).attr('fillcolor'));
    $("#changestrokecolor").val($("#tr"+i).attr('strokecolor'));
	
	var changestyleoflayer= $("#changestyleoflayer");
	    changestyleoflayer.dialog({
		  autoOpen:false,
		  title:"<center><font color=black>Change the style of layer:<br><b><u>"+nameoflayer+"</font></center></u></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[620,92]

		});
      
     changestyleoflayer.dialog('open');
     var fillcolor= $("#changefillcolor").val();
     var strokecolor= $("#changestrokecolor").val();
     userConfig.style.currentlayerid=i;
     userConfig.style.fillcolor=fillcolor;
     userConfig.style.strokecolor=strokecolor;
}






function changethestyle(i,fillcolor,strokecolor)
{
	var R=hexToR(fillcolor);
	var G=hexToG(fillcolor);
	var B=hexToB(fillcolor);
	var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
	var opacity=$('.opacity'+userConfig.overlayer[i].get("title"));
	

	 
	 var newstyle=new ol.style.Style({
             fill: new ol.style.Fill({
             color: 'rgba('+R+', '+G+', '+B+', '+opacity.attr("value")+')'
              }),
             stroke: new ol.style.Stroke({
              color: '#'+strokecolor,
              width: 2
              })
             // image: new ol.style.Icon({
             //   src: 'images/remove16.png'
             // })
             });

	      newsource = layer.getSource();
	      layer.setStyle(newstyle);
	     newfeatures = newsource.getFeatures();
	      
	     for(var i=0;i<newfeatures.length;i++)
	     {//newfeatures[i]
	         	newfeatures[i].setStyle(newstyle);
	         	
	        
	     }	
}
function changeopacity(i)
{
	var fillcolor=$("#tr"+i).attr('fillcolor');
	var strokecolor=$("#tr"+i).attr('strokecolor');
	var R=hexToR(fillcolor);
	var G=hexToG(fillcolor);
	var B=hexToB(fillcolor);
	
	var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
	var opacity=$('.opacity'+userConfig.overlayer[i].get("title"));
	 
	 var newstyle=new ol.style.Style({
             fill: new ol.style.Fill({
             color: 'rgba('+R+', '+G+', '+B+', '+opacity.attr("value")+')'
              }),
             stroke: new ol.style.Stroke({
              color: '#'+strokecolor,
              width: 2
              }),
              image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#ffcc33'
               })
             })
             });

	      newsource = layer.getSource();
	      layer.setStyle(newstyle);
	     newfeatures = newsource.getFeatures();
	      
	     for(var i=0;i<newfeatures.length;i++)
	     {//newfeatures[i]
	         	newfeatures[i].setStyle(newstyle);
	         	
	        
	     }

}


function addnewoverlayer(i,check)
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
	    //zoom to currentlayer
	    html+='  <button class="mapButton" title="zoot to: '+userConfig.overlayer[i].get("title")+'" id="'+userConfig.overlayer[i].get("title")+'" onclick="zoomtocurrentlayer('+i+')" style="cursor: pointer"><img src="images/search16.png" style="WIDTH: 9px; HEIGHT: 9px"></img></button>';
	    html+='</td>';
	    //change color
	    html+="<td>";

	    html+='<button class="mapButton" title="change style to: '+userConfig.overlayer[i].get("title")+'" id="'+userConfig.overlayer[i].get("title")+'" onclick="changestyle('+i+')" style="cursor: pointer"><img src="images/draw.png" style="WIDTH: 9px; HEIGHT: 9px"></img></button>';
	    html+='</td>';
	    
	    //remove button	    
	    html+="<td>";

	    html+='<button class="mapButton" title="remove layer: '+userConfig.overlayer[i].get("title")+'" id="'+userConfig.overlayer[i].get("title")+'" onclick="removecurrentlayer('+i+')" style="cursor: pointer"><img src="images/remove16.png" style="WIDTH: 9px; HEIGHT: 9px"></img></button>';
	    html+='</td>';	    
	     html+="</tr>";
	     html+="</table>";

	      return html;
}//function addnewoverlayer(i,check)



function addnewoverlayerforbuildingdetail(buidingid,lod)
{
	////////////////////topical variable////////////////////
	var thebuildingsdetail=[];
	var getbuildings;
	var buildingid=[];
	var objectclassid=[];
	var objectclassname=[];
	///////////////////////////////
	
	
	
	     $.post('phplib/requestdata.php?request=0',{},function(dbname){ 
      	    citydbname=dbname;
      	 }); 
	
	   // var lod=$( "#selectedlod" ).val();
        $.post('phplib/requestdata.php?request=6',{lod:lod,buidingid:buidingid},function(buildingsdetail){
        	//alert(buildingsdetail);
        	
        	 var parsed = JSON.parse(buildingsdetail);
             for(var x in parsed){
             	
           	
               thebuildingsdetail.push(parsed[x]);
              // alert(thebuildingsdetail);
               getbuildings = JSON.parse(thebuildingsdetail[x]);
              // alert(getbuildings);
               buildingid.push(getbuildings.crs.properties.building);
               objectclassid.push(getbuildings.crs.properties.surfacetype_id);
               objectclassname.push(getbuildings.crs.properties.surfacename);
              // alert(objectclassname[x]);
              
              }
            var checking=false; 
            var checkname=citydbname+"_l"+lod+"_b"+buildingid[0]+"_"+objectclassname[0];//only one no problem
            //alert(buildings.length);
            for(var i=0;i<userConfig.overlayer.length;i++)
      	      {
      	    	if(userConfig.overlayer[i].get("title")===checkname)
      	    	{
      	    		checking=true;
      	    		
      	    	}
      	      }
            
            
             for(var i=0;i<thebuildingsdetail.length;i++)
             {
             	if(checking==true)
             	{
             		var name=citydbname+"_l"+lod+"_b"+buildingid[i]+"_"+objectclassname[i];
                    for(var j=0;j<userConfig.overlayer.length;j++)
      	               {
      	               	  if(userConfig.overlayer[j].get("title")==name)
      	    	             {
                            $("#tr"+j).css('display','block');
                            zoomtocurrentlayer(j);
                           
                            if(document.getElementById("checkbox"+j).checked==true)
  	                           {
                               userConfig.overlayer[j].setVisible(true);	
                                }
                              }
      	               	
      	               }

             	}
              if(checking==false)
      	        {

                 var vectorsource = new ol.source.Vector();
             
                 var geojsonFormat = new ol.format.GeoJSON();
                var features = geojsonFormat.readFeatures(thebuildingsdetail[i],
                   {featureProjection: 'EPSG:3857'});
                   vectorsource.addFeatures(features);
             
               

	            var json=new ol.layer.Vector({
                 title: citydbname+"_l"+lod+"_b"+buildingid[i]+"_"+objectclassname[i],
                 source: vectorsource,
                 style: defaultstyle
                    });
              
                ol2d.addLayer(json);
               // var layer = findBy(ol2d.getLayerGroup(),citydbname);
                setTimeout(function() {
                        ol2d.getView().fit(json.getSource().getExtent(), ol2d.getSize());
                       }, 200);
                userConfig.overlayer.push(json);
                              
                 var data=$('#data').html(); 

                 html=addnewoverlayer(userConfig.overlayer.length-1,true);
                // configureOverlayers();
                    if(data!=="no data")
                     {
                     	
                      $('#data').html(data+html);
                     
                     }
                     else
                     {
                     	
                     	
                     	$('#data').html(html);
                     	
                     }

                }
                
                
                }

        });
	
	
	
}


