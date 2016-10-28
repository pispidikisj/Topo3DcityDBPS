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



function addopening(buildingid,lod)
{
	
	html='<span id="lodopening" >Lod for Opening data: <select id="selectedlodopening" style="cursor:pointer;"'; 
	html+='onchange="checklodofopening(this,'+buildingid+')">';
	html+='<option value="0">select lod</option><option value="3">lod3</option><option value="4">lod4</option></select></span>';
	html+='<div id="openingdata" style="max-height: 170px; overflow-y: scroll; margin:auto; text-align:center;"></div>';
	
	$('#openinglayer').html(html); 
	
	openinglayer(buildingid,lod);
}


function checklodofopening(sel,buildingid)
{   	////////////////////topical variable////////////////////
	var Theopening=[];
	var getopening;
	//var buildingid=[];
	var objectclassid=[];
	var objectclassname=[];
	var cityobject_id=[];
	///////////////////////////////
	var lodthematic=$( "#selectedlod" ).val();
	 $('#openingdata').html("please wait...."); 
	
	$.post('phplib/requestdata.php?request=9',{lodthematic:lodthematic,lodopening:sel.value,buidingid:buildingid},function(result){
	
	if(result==0)
	{
		
		messagealert("No opening data in lod"+sel.value,"ATTETION!");
		$('#openingdata').html(""); 
	}
	else
	{
		
	  var parsed = JSON.parse(result);
      for(var x in parsed){
           	
        Theopening.push(parsed[x]);

        getopening = JSON.parse(Theopening[x]);

         objectclassid.push(getopening.crs.properties.objectclass_id);
         objectclassname.push(getopening.crs.properties.classname);
         cityobject_id.push(getopening.crs.properties.cityobject_id);

              
              }
            
		
		
	   html='<hr>';	       	
       html+="<table style='margin:auto; text-align:left'>";
              html+='<tr style="background-color: rgba(188, 120, 32, 0.88);">';
                   html+="<td>";
                   html+="</td>";
                   html+="<td>opening details";
                   html+="</td>";
                   html+="<td>tool";
                   html+="</td>";
              html+="</tr>";
              for(var i=0;i<Theopening.length;i++)
              {
              	html+="<tr>";
              	html+="<td>"+(i+1)+"</td>";
              	html+='<td>opening: '+objectclassname[i]+':'+cityobject_id[i]+'</td>';
              	html+='   <td ><img id="opening_'+i+'" onclick="addcurrentopeninig('+lodthematic+','+sel.value+','+cityobject_id[i]+','+buildingid+')" src="images/add16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add Opening: '+cityobject_id[i]+'"></img></td>';

              	
              	html+='</tr>';

              }
              
              html+='</table>';
		
		     $('#openingdata').html(html); 
		
	}
	
	
	});
	
	
	
}
function addcurrentopeninig(lodthematic,lodopening,openingid,thebuildingsid)
{
	var Theopening=[];
	    
    var Theopening=[];
	 var getopening;

	var objectclassname=[];

	 $.post('phplib/requestdata.php?request=13',{lodthematic:lodthematic,lodopening:lodopening,openingid:openingid,buidingid:thebuildingsid},function(result){
	 	
	 	
             var parsed = JSON.parse(result);
             for(var x in parsed){
                  Theopening.push(parsed[x]);
                  getopening = JSON.parse(Theopening[x]);
                   objectclassname.push(getopening.crs.properties.classname);	
                        	
                        }
		 	   

      	    var checking=false;
      	    
      	   // alert("sdf");
            var checkname=citydbname+"_b"+thebuildingsid+"_l"+lodopening+"_"+objectclassname[0]+"_"+openingid;//only one no problem
      	    
      	    
      	  
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
 
                        for(i=0;i<Theopening.length;i++)
                        {
                        var vectorsource = new ol.source.Vector();
             
                        var geojsonFormat = new ol.format.GeoJSON();
                        var features = geojsonFormat.readFeatures(Theopening[i],
                        {featureProjection: 'EPSG:3857'});
                        vectorsource.addFeatures(features);

	                    var json=new ol.layer.Vector({
                        title: citydbname+"_b"+thebuildingsid+"_l"+lodopening+"_"+objectclassname[i]+"_"+openingid,
                       source: vectorsource,
                       style: defaultstyle
                          });
              
                        ol2d.addLayer(json);

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
