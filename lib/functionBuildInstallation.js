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



function addinstallation(buildingid,lod)
{
	
	html='<span id="lodinstallation" >Lod for installation data: <select id="selectedlodinstallation" style="cursor:pointer;"'; 
	html+='onchange="checklodofinstallation(this,'+buildingid+')">';
	html+='<option value="0">select lod</option><option value="2">lod2</option><option value="3">lod3</option><option value="4">lod4</option></select></span>';
	html+='<div id="installationdata" style="max-height: 170px; overflow-y: scroll; margin:auto; text-align:center;"></div>';
	
	$('#installationlayer').html(html); 
	
	theinstallationlayer(buildingid,lod);
}


function checklodofinstallation(sel,buildingid)
{   	////////////////////topical variable////////////////////
	var Theinstallation=[];
	var getinstallation;
	//var buildingid=[];
	var installation_id=[];
	var classname=[];
	//var cityobject_id=[];
	///////////////////////////////
	//var lodthematic=$( "#selectedlod" ).val();
	 $('#installationdata').html("please wait...."); 
	
	$.post('phplib/requestdata.php?request=17',{lodinstallation:sel.value,buildingid:buildingid},function(result){
	
	if(result==0)
	{
		
		messagealert("No installation data in lod"+sel.value,"ATTETION!");
		$('#installationdata').html(""); 
	}
	else
	{
		
	  var parsed = JSON.parse(result);
      for(var x in parsed){
           	
        Theinstallation.push(parsed[x]);
              // alert(thebuildingsdetail);
        getinstallation = JSON.parse(Theinstallation[x]);
              // alert(getbuildings);
               //buildingid.push(getbuildings.crs.properties.building);
         installation_id.push(getinstallation.crs.properties.installation_id);
         classname.push(getinstallation.crs.properties.classname);
         //cityobject_id.push(getopening.crs.properties.cityobject_id);
              // alert(objectclassname[x]);
              
              }
            
		
		
	   html='<hr>';	       	
       html+="<table style='margin:auto; text-align:left'>";
              html+='<tr style="background-color: rgba(188, 120, 32, 0.88);">';
                   html+="<td>";
                   html+="</td>";
                   html+="<td>installation details";
                   html+="</td>";
                   html+="<td>tool";
                   html+="</td>";
              html+="</tr>";
              for(var i=0;i<Theinstallation.length;i++)
              {
              	html+="<tr>";
              	html+="<td>"+(i+1)+"</td>";
              	html+='<td>Installation: '+classname[i]+':'+installation_id[i]+'</td>';
              	html+='   <td ><img id="opening_'+i+'" onclick="addcurrentinstallation('+sel.value+','+installation_id[i]+','+buildingid+')" src="images/add16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add Opening: '+installation_id[i]+'"></img></td>';
              	html+='</tr>';

              }
              
              html+='</table>';
		
		     $('#installationdata').html(html); 
		
	}
	
	
	});
	
	
	
}
function addcurrentinstallation(lodinstallation,installationid,thebuildingsid)
{
	var Theinstallation=[];
	    
    var Theinstallation=[];
	 var getinstallation;
	 var installation_id=[];
	//var buildingid=[];
	            // var objectclassid=[];
	var classname=[];
	            // var cityobject_id=[];
         	
         	

	
	 $.post('phplib/requestdata.php?request=18',{lodinstallation:lodinstallation,installationid:installationid,buildingid:thebuildingsid},function(result){
	 	
	 	
             var parsed = JSON.parse(result);
             for(var x in parsed){
                  Theinstallation.push(parsed[x]);
                  getinstallation = JSON.parse(Theinstallation[x]);
                   classname.push(getinstallation.crs.properties.classname);
                   installation_id.push(getinstallation.crs.properties.installation_id);
                   	
                        	
                        }
		 	   

      	    var checking=false;
      	    
      	   // alert("sdf");
            var checkname=citydbname+"_b"+thebuildingsid+"_l"+lodinstallation+"_"+classname[0]+"_"+installationid;//only one no problem
      	    
      	    
      	  
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
 
                        for(i=0;i<Theinstallation.length;i++)
                        {
                        var vectorsource = new ol.source.Vector();
             
                        var geojsonFormat = new ol.format.GeoJSON();
                        var features = geojsonFormat.readFeatures(Theinstallation[i],
                        {featureProjection: 'EPSG:3857'});
                        vectorsource.addFeatures(features);
             
               

	                    var json=new ol.layer.Vector({
                        title: citydbname+"_b"+thebuildingsid+"_l"+lodinstallation+"_"+classname[i]+"_"+installationid,
                       source: vectorsource,
                       style: defaultstyle
                          });
              
                        ol2d.addLayer(json);

                         userConfig.overlayer.push(json);
                              
                         var data=$('#data').html(); 

                         html=addnewoverlayer(userConfig.overlayer.length-1,true);

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
