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


function infoforbuilding(buildingid,lod)
 { 
    createinformationbuilt(buildingid);
    createaddressbuilt(buildingid);
        /////////////////button zoom to/////////////
   var html='<div style="text-align:right;"><button class="mapButton" onclick="addnewoverlayerforbuildingdetail('+buildingid+','+lod+')"><img src="images/zoom_in_16.png" style="WIDTH: 22px; HEIGHT: 22px"></img>Zoom to</button></div>';
    html+='<div id="accordion">';

   html+='<h3>Building information</h3>';
   html+='<div id="informationdiv">';
 
   html+="</div>";

 	html+='<h3>Address information</h3>';
 	html+='<div id="addressinfodiv">';                      
 	html+='</div>';
 	     	 	            
 	     	 	          
 	html+='<h3>Generic information</h3>';
 	html+='<div id="genericinfo">';
 	     	 	       
 	html+='</div>'; 	     	 	           
 	html+='</div>';

 	$('#infolayer').html(html); 
    $('#accordion').accordion({ autoHeight : false }); 
 	
     theinfolayer(buildingid);	

 }
 
function createinformationbuilt(buildingid)
{

   	 $.post('phplib/requestdata.php?request=8',{buildingid:buildingid},function(result){

         if(result==0)
	           {
		
		        $('#informationdiv').html("There is no information data for building: "+buildingid);  

	            }
	        else
	           { 

 	     	   	 var parsed = JSON.parse(result);
                 var info=JSON.parse(parsed);
 	
 	 var informationdata={
                       	
                       	"class":info.theclass,
                       	"class codespace":info.class_codespace,
                       	"function codespace":info.function_codespace,
                       	"usage":info.usage,
                       	"usage codespace":info.usage_codespace,
                       	"year of construction":info.year_of_construction,
                       	"roof type":info.roof_type,
                       	"roof type codespace":info.roof_type_codespace,
                       	"measured height":info.measured_height,
                       	"measured height unit":info.measured_height_unit
                      };
                      
                       	     var html="<table style='margin:auto; text-align:left'>";
 	     	 	                 html+='<tr style="background-color: rgba(188, 120, 32, 0.88);">';
 	     	 	                 html+="<td>Attribute";
                                 html+="</td>";
                                 html+="<td>value";
                                  html+="</td>";
                                  html+='</tr>';
                             
                                	
   
 	                              for (var item in  informationdata) {
                                        if ( informationdata.hasOwnProperty(item)) {
                                        	if(informationdata[item]!="")
                                        	  {
                         	
                         	               html+='<tr><td><b>'+item+'</b></td><td>'+ informationdata[item]+'</td></tr>';
                                              }
                                            }
                                        }

 	     	 	                    
 	     	 	                 html+='</table>';
 	     	 	                 
 	     	 	              $('#informationdiv').html(html);   
 	     	 	              
 	     	 	              
 	     	 	            }   
                     	});	
	
	
	
}

function zoomtobuilding(buildingid)
{
	
	alert(buildingid);
	
	
}

function createaddressbuilt(buildingid)
{
 	             $.post('phplib/requestdata.php?request=7',{buildingid:buildingid},function(result){

                  if(result==0)
	                    {
		
		               $('#addressinfodiv').html("There is no address data for building: "+buildingid);  

	                  }
	                else
	                 { 
 	     	   	      var parsed = JSON.parse(result);
                       var info=JSON.parse(parsed);
 	
 	               var  addressdata={
                       	
                       	"street":info.street,
                       	"house number":info.house_number,
                       	"po_box":info.po_box,
                       	"zip code":info.zip_code,
                       	"city":info.city,
                       	"state":info.state,
                       	"country":info.country


                      };
                      
                      
                                var html="<table style='margin:auto; text-align:left'>";
 	     	 	                 html+='<tr style="background-color: rgba(188, 120, 32, 0.88);">';
 	     	 	                 html+="<td>Attribute";
                                 html+="</td>";
                                 html+="<td>value";
                                  html+="</td>";
                                  html+='</tr>'; 	     	 	              
 	                              for (var item in  addressdata) {
                                        if ( addressdata.hasOwnProperty(item)) {
                                        	if(addressdata[item]!="")
                                        	  {
                         	
                         	               html+='<tr><td><b>'+item+'</b></td><td>'+ addressdata[item]+'</td></tr>';
                                              }
                                            }
                                        }
  	     	 	             html+='</table>';  
  	     	 	             
  	     	 	           $('#addressinfodiv').html(html);   
  	     	 	           
  	     	 	           }                        
                        }); 	
	
}

