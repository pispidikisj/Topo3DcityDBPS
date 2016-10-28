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




function addroom(buildingid,lod)
{
	
	html='<span id="lodroom" >Geometry of room: <select id="selectedgeometryroom" style="cursor:pointer;"'; 
	html+='onchange="checkgeometryofroom(this,'+buildingid+')">';
	html+='<option value="0">select</option><option value="solid">solid</option><option value="multisurface">multisurface</option></select></span>';
	html+='<div id="roomdata" style="max-height: 170px; overflow-y: scroll; margin:auto; text-align:center;"></div>';
	
	$('#roomlayer').html(html); 
	
	roomlayer(buildingid,lod);
}


function checkgeometryofroom(sel,buildingid)
{
	
	
    var Theroom=[];
	var getroom;
	//var buildingid=[];
	var roomid=[];
    var solid=1;
	
  var geometryroom=$( "#selectedgeometryroom" ).val();	
    $('#roomdata').html("please wait...."); 
   
   if(geometryroom=="solid")
     {  
     	solid=1;
     	$.post('phplib/requestdata.php?request=11',{solid:solid,buildingid:buildingid},function(result){
     	
     	    if(result==0)
	           {
		
		       messagealert("No room data  for type: "+sel.value,"ATTETION!");
		       $('#roomdata').html(""); 
	            }
	        else
	           { 
	        
	           	  	  var parsed = JSON.parse(result);
                      for(var x in parsed){
           	
        				Theroom.push(parsed[x]);
        				getroom = JSON.parse(Theroom[x]);
        			    roomid.push(getroom.crs.properties.room_id);

              			}
              			
              html='<hr>';	       	
              html+="<table style='margin:auto; text-align:left'>";
              html+='<tr style="background-color: rgba(188, 120, 32, 0.88);">';
                   html+="<td>";
                   html+="</td>";
                   html+="<td>room details";
                   html+="</td>";
                   html+='<td style="text-align: center;">tool';
                   html+="</td>";
                   html+='<td style="text-align: center;">semantics';
                   html+="</td>";                   
              html+="</tr>";
              for(var i=0;i<Theroom.length;i++)
              {
              	html+="<tr>";
              	html+="<td>"+(i+1)+"</td>";
              	html+='<td>room: '+roomid[i]+'</td>';
              	html+='   <td style="text-align: center;"><img id="room'+i+'" onclick="addcurrentroom('+solid+','+roomid[i]+','+buildingid+')"  src="images/add16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add room: '+roomid[i]+'"></img></td>';
              	html+='   <td style="text-align: center;"><img id="furniture_'+i+'" onclick="addfurniture('+roomid[i]+','+buildingid+')" src="images/furniture.jpg" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add furniture"></img></td>';

              	html+='</tr>';

              }
              
              html+='</table>';
		
		     $('#roomdata').html(html); 		
              			
              			
              			
	           	
	           	
	           	
	           }
     	
     	
     	});
     	

     }
  else if(geometryroom=="multisurface")
     {
     	solid=0;
	
	    $.post('phplib/requestdata.php?request=11',{solid:solid,buildingid:buildingid},function(result){
     	
     	 if(result==0)
	           {
		
		       messagealert("No room data  for type: "+sel.value,"ATTETION!");
		       $('#roomdata').html(""); 
	            }
	        else
	           {
	           	  	  var parsed = JSON.parse(result);
                      for(var x in parsed){
           	
        				Theroom.push(parsed[x]);
        				getroom = JSON.parse(Theroom[x]);
        			    roomid.push(getroom.crs.properties.room_id);

              			}
              			
              html='<hr>';	       	
              html+="<table style='margin:auto; text-align:left'>";
              html+='<tr style="background-color: rgba(188, 120, 32, 0.88);">';
                   html+="<td>";
                   html+="</td>";
                   html+="<td>room details";
                   html+="</td>";
                   html+="<td>tool";
                   html+="</td>";
                   html+="<td style='text-align: center;'>semantics";
                   html+="</td>";
              html+="</tr>";
              for(var i=0;i<Theroom.length;i++)
              {
              	html+="<tr>";
              	html+="<td>"+(i+1)+"</td>";
              	html+='<td>room: '+roomid[i]+"</td>";
              	html+='   <td style="text-align: center;" ><img id="room'+i+'" onclick="addcurrentroom('+solid+','+roomid[i]+','+buildingid+')"  src="images/add16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add room: '+roomid[i]+'"></img></td>';
                html+='   <td style="text-align: center;" ><img id="furniture_'+i+'" onclick="addfurniture('+roomid[i]+','+buildingid+')" src="images/furniture.jpg" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add furniture"></img></td>';
	
              	html+='</tr>';

              }
              
              html+='</table>';
		
		     $('#roomdata').html(html); 		
              			
              			
              			
	           	
	           	
	           	
	           }
     	
     	
     	});
     }
	
	
}

function addcurrentroom(solid,theroomid,buildingid)
{
	
	    
    var Theroom=[];
	 var getroom;
	//var buildingid=[];
	            // var objectclassid=[];
	var roomid=[];
	            // var cityobject_id=[];
         	
         	
 
	
	 $.post('phplib/requestdata.php?request=14',{solid:solid,roomid:theroomid,buildingid:buildingid},function(result){
	 	
	 	
             var parsed = JSON.parse(result);
             for(var x in parsed){
                  Theroom.push(parsed[x]);
                  getroom = JSON.parse(Theroom[x]);
                   roomid.push(getroom.crs.properties.room_id);	
                        	
                        }
		 	   

      	    var checking=false;
      	    
      	   // alert("sdf");
            var checkname=citydbname+"_b"+buildingid+"_room_"+roomid[0];//only one no problem
      	    
      	    
      	  
      	    ///check if load again --problems in features when reloaded
         for(var i=0;i<userConfig.overlayer.length;i++)
      	    {
      	    	if(userConfig.overlayer[i].get("title")==checkname)
      	    	 {
                 $("#tr"+i).css('display','block');
                 checking=true;
                   if(document.getElementById("checkbox"+i).checked==true)
  	                  {
                    userConfig.overlayer[i].setVisible(true);	
                      }
                }
            }    
                
                
         
         if(checking==false)
         {
 
                        for(i=0;i<Theroom.length;i++)
                        {
                        var vectorsource = new ol.source.Vector();
             
                        var geojsonFormat = new ol.format.GeoJSON();
                        var features = geojsonFormat.readFeatures(Theroom[i],
                        {featureProjection: 'EPSG:3857'});
                        vectorsource.addFeatures(features);
             
               

	                    var json=new ol.layer.Vector({
                        title: citydbname+"_b"+buildingid+"_room_"+roomid[i],
                       source: vectorsource,
                       style: defaultstyle
                          });
              
                        ol2d.addLayer(json);
               // var layer = findBy(ol2d.getLayerGroup(),citydbname);
                      // setTimeout(function() {
                         //   ol2d.getView().fitExtent(json.getSource().getExtent(), ol2d.getSize());
                         //  }, 200);
                         userConfig.overlayer.push(json);
                              
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
                        	
                        	
                        	
                        }
                        
                        
                        
                        
                        

              }  
            });
	
	
	
	
}



