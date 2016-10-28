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

function addfurniture(roomid,buildingid)
{
	
	    
    var Thefurniture=[];
	 var getfurniture;
	//var buildingid=[];
	            // var objectclassid=[];
	var furniture_id=[];
	            // var cityobject_id=[];
         	
         	

	
	 $.post('phplib/requestdata.php?request=19',{roomid:roomid,buildingid:buildingid},function(result){
	 	
	 	
	 	   if(result==0)
	          {
		
		       messagealert("No furniture data for room "+roomid+"(building:"+buildingid+")","ATTETION!");
 
	          }
	         else
	 	
	 	     {
	 	
             var parsed = JSON.parse(result);
             for(var x in parsed){
                  Thefurniture.push(parsed[x]);
                  getfurniture = JSON.parse(Thefurniture[x]);
                   furniture_id.push(getfurniture.crs.properties.furniture_id);	
                        	
                        }
		 	   

      	    var checking=false;
      	                var checkname=citydbname+"_b"+buildingid+"_r"+roomid+"_"+furniture_id[0];//only one no problem
      	    for(var i=0;i<userConfig.overlayer.length;i++)
      	      {
      	    	if(userConfig.overlayer[i].get("title")===checkname)
      	    	{
      	    		checking=true;
      	    		
      	    	}
      	      }
      	    
      	   // alert("sdf");

      	    
      	    
      	  
      	    ///check if load again --problems in features when reloaded
            for(var i=0;i<Thefurniture.length;i++)
             {
             	if(checking==true)
             	{
             		var name=citydbname+"_b"+buildingid+"_r"+roomid+"_"+furniture_id[i];
                    for(var j=0;j<userConfig.overlayer.length;j++)
      	               {
      	               	  if(userConfig.overlayer[j].get("title")==name)
      	    	             {
                            $("#tr"+j).css('display','block');
                            //zoomtocurrentlayer(j);
                           
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
                var features = geojsonFormat.readFeatures(Thefurniture[i],
                   {featureProjection: 'EPSG:3857'});
                   vectorsource.addFeatures(features);
             
               
                var name=citydbname+"_b"+buildingid+"_r"+roomid+"_"+furniture_id[i];
	            var json=new ol.layer.Vector({
                 title: citydbname+"_b"+buildingid+"_r"+roomid+"_"+furniture_id[i],
                 source: vectorsource,
                 style: defaultstyle
                    });
              
                ol2d.addLayer(json);
               
               var layer = findBy(ol2d.getLayerGroup(),name);
               layer.setVisible(false);
                
                userConfig.overlayer.push(json);
                              
                 var data=$('#data').html(); 

                 html=addnewoverlayer(userConfig.overlayer.length-1,false);
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
              
              
              }
            });
	
	
	
	
}
