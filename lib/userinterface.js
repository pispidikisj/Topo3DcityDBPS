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




var citydbname="";
var newfeature;
var newsource;
var title;
////////popupinformation

function toggleMenusBasemap(menuObj, buttonObj){
	if(menuObj){
		hidePopup();
	}
	var currentlyOpen = $('#mapcon .slideMenu').filter(':visible');
	var currentlyOpenID = '#'+currentlyOpen.attr('id');
	hideLayerInfo();
	$('#topMenuCon .mapButton').removeClass('buttonSelected');
	$('#topMenuCon .mapButtonTOC').removeClass('buttonSelected');
	if(currentlyOpenID !== menuObj && menuObj){
		currentlyOpen.slideUp('fast',showMenu(menuObj, buttonObj));
	}
	else{
		currentlyOpen.slideUp('fast');
	}
}

function messagealert(message,title)
{
   var messagealert= $("#messagealert");
	    messagealert.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>"+title+"</font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[484,281],
	      modal:true,
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
     });
     
     $('#messagealert').html("<center>"+message+"</center>"); 
     messagealert.dialog('open');
	
}

var popupinformation= $("#popupinformation");
	    popupinformation.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>information<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[620,92],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		
		
		//popupinformation.dialog('open');
		 
});




var connecitonlayer= $("#connecitonlayer");
	    connecitonlayer.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Layers of 3DcityDB<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[620,92],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
});


var connecitonlayerOGC= $("#connecitonlayerOGC");
	    connecitonlayerOGC.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Add OGC data (from GeoServer)<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[620,92],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		},
		 buttons: {
        "ADD": function() {
        	
        	var selectionworkspace=$('#selectedworkspace').val();
	        var selectionlayer = $('#selectedlayer').val();
	        var selectionstore = $('#selectedstore').val();
            var geoserverurl=$("#geoserverurl").val();
            var ogc=$("#selectedogc").val();
            
            if(selectionworkspace=="-" ||selectionlayer=="-" ||selectionworkspace=="-" ||selectionstore=="-" ||geoserverurl=="")
               {
               	messagealert("Some fields are missing","ATTENTION!")
               }
               else
               {
        	
        	AddOgcLayers(geoserverurl,selectionworkspace,selectionstore,selectionlayer,ogc);
        	}

        }// "ADD": function() {
       }
		 
});



function sidebysideconnectfunction()
{
	
  if(document.getElementById("map3d").style.visibility=="hidden")
  {
  $("#map3d").css('visibility','visible');
  ol3dnew.setEnabled(true);	
    }
    else
    {
   	$("#map3d").css('visibility','hidden');
    	ol3dnew.setEnabled(false);	
    	
   }

}
///////////////////////////////////////

var ThreedcityDBConnect= $("#ThreedcityDBConnect");
	    ThreedcityDBConnect.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>3DcityDB new connection</font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[620,92],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
});

var buidingquery= $("#buidingquery");
	      buidingquery.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Select buildings by attributes<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[592,98],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		},
		 buttons: {
        "Execute": function() {
          //$( this ).dialog( "close" );
         executequery();
          //checkalllod();
        }
       }
		 
   });
   


function SpatialqueriesConnect(html)
{
   var SpatialqueriesConnect= $("#SpatialqueriesConnect");
	    SpatialqueriesConnect.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Building Results</font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[56,193],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
});

$("#SpatialqueriesConnect").html(html);
SpatialqueriesConnect.dialog('open');

} 

function theinfolayer(buildingid)
{
   var infolayer= $("#infolayer");
	    infolayer.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Information for building: "+buildingid+"<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[56,193],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
});


infolayer.dialog('open');

}   

function openinglayer(builidngid,lod)
{
	
	var openinglayer= $("#openinglayer");
	    openinglayer.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Opening data for building: "+builidngid+" (lod "+lod+")<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[312,115],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
   });
   
   openinglayer.dialog('open');
 
}


function theinstallationlayer(builidngid,lod)
{
	
	var installationlayer= $("#installationlayer");
	    installationlayer.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Installation data for building: "+builidngid+" (lod "+lod+")<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[412,215],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}

   });
   
   installationlayer.dialog('open');
	
	
}

function thefurniturelayerlayer(builidngid,roomid)
{
	
	var installationlayer= $("#installationlayer");
	    installationlayer.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Furniture data for building: "+builidngid+" (room "+roomid+")<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[412,215],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
   });
   
   installationlayer.dialog('open');
	
	
}

function showstreetviewmesssage(message,title)
{
	
	  var showstreetviewmesssage= $("#showstreetviewmesssage");
	    showstreetviewmesssage.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>"+title+"</font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[484,281],
	      modal:true,
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		},
		buttons: {
        "Ok": function() {
        	$( this ).dialog( "close" );
            document.getElementById("map").style.cursor="pointer";
             ol2d.once('click', function(evt) {
             	  showstreetview(evt);   
             });
        },
        "Cancel":function(){
        	
        	$( this ).dialog( "close" );
        	document.getElementById("map").style.cursor="default";

        }
       }
		 
		 
     });
     
     $('#showstreetviewmesssage').html("<center>"+message+"</center>"); 
     showstreetviewmesssage.dialog('open');
	
	
}
function roomlayer(builidngid,lod)
{
	
	var roomlayer= $("#roomlayer");
	      roomlayer.dialog({
		  autoOpen:false,
		  title:"<b><center><font color=black>Room data for building: "+builidngid+"<br></font></center></b>",
		  width:'auto',
		  height:'auto',
		  resizable:false,
		  draggable:true,
	      position:[304,308],
		  closeOnEscape:true,
		  close: function(event, ui){
			//$('#ThreedcityDBConnect').html(""); 
		},
		  open:function(event, ui){
			//configuration3DcityDBconnection();
		}
		 
   });
   
   roomlayer.dialog('open');
 
}

function showstreetview(evt)
{
	
	
     
  var coordinate = evt.coordinate;
  //convert to 4326
  var wgs = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
  
  
  //alert(hdms);
  var url="phplib/googlemapview.php?lat="+wgs[1]+"&lng="+wgs[0];
  var googlewin=dhtmlwindow.open("googlebox", "iframe", url, "#1: Google Web site", "width=590px,height=350px,resize=1,scrolling=1,center=1", "recal");
	googlewin.load('iframe', url, "street view");
	
	//googlewin.onclose=function(){
		
   document.getElementById("map").style.cursor="default";
		
	//} 

  
  


	
	
   //var god= googlewin.load('iframe', url, 'CSS Drive');
   //  var mysurvey=dhtmlmodal.open("surveybox", "iframe", url, "Fill out this survey", "width=700px,height=450px,resize=1,scrolling=1,center=1", "recal");
}

function terrainchange(j)
{
scene.terrainProvider = userConfig.terrainprovider[j];
}

function baselayerchange(j)
{
  for (i = 0, ii = userConfig.baselayer.length; i < ii; ++i) {

      userConfig.baselayer[i].setVisible(false);
      }
  
   userConfig.baselayer[j].setVisible(true);

}

function overlayerconficheck()//for first use
{
	for (i = 0, ii = userConfig.overlayer.length; i < ii; ++i) {
		
	if(document.getElementById("checkbox"+i).checked==false)
  	   {
  	      var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
  	      layer.setVisible(false);
  	    }
  	    else
  	    {

  	    	 var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
  	    	 layer.setVisible(true);
  	    }
	
	
	}
	
	
}//function overlayerconficheck()

function overlayercheck(j)
{
	
	///////hidden opacity
	
	  var data=userConfig.overlayer[j].get("title");

         
  	 if(document.getElementById("checkbox"+j).checked==false)
  	   {
  	      var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[j].get("title"));
  	      layer.setVisible(false);
  	     
  	       $(".opacity"+userConfig.overlayer[j].get("title")).css('display','none');
  	       $("#hover"+j).css('visibility','hidden');
  	      
  	    }
  	    else
  	    {

  	    	 var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[j].get("title"));
  	    	 layer.setVisible(true);
  	    	  $(".opacity"+userConfig.overlayer[j].get("title")).css('display','block');
  	    	   $("#hover"+j).css('visibility','visible');
  	    }

}//overlayercheck(j)


function changestyle(i)
{
	
	changestyleoflayer(i);
}        
        


function configureOverlayers()
{newfeatures=[];
	var html='<center><b>OVERLAYERS</b></center><a class="closer-icon" id="closer-icon" onclick="toggleoverlayerPanel(false)">&times;</a><hr>';
	 
	 html+='<div id="buttonsofoverlay">';
	       html+='<button id="buildingquery" class="mapButton" onclick="querybox()" title="add 3dcityDB data by query"><img src="images/addquery.png" style="WIDTH: 22px; HEIGHT: 22px"></img></button>';
	       html+='<button id="3dcitybdadd" class="mapButton" title="add 3dcityDB data"><img src="images/add16.png" style="WIDTH: 22px; HEIGHT: 22px"></img></button>';
	       html+='<button id="3dcitybdaddogc" class="mapButton" title="add OGC data"><img src="images/icon-nixus-Add.png" style="WIDTH: 22px; HEIGHT: 22px"></img></button>';

	       html += ' <button id="removector" class="mapButton" title="remove layer"><img src="images/remove16.png" style="WIDTH: 32px; HEIGHT: 32px"></img></button>';

	 html+='</div><hr>';
	 //

            
	 ///
	if(userConfig.overlayer.length==0)
	  {
	 // html+="</div><hr>";	
	 
	   html+="<div id='data' style='max-height: 368px; overflow-y: scroll'>no data</div>";
	   
	  }
	  else
	  {
 	
	  	html+='<table>';
	  	html+="<div id='data' style='max-height: 368px;'>";
	    for (i = 0, ii = userConfig.overlayer.length; i < ii; ++i) {
	    //check visible for current layer
	    html+='<tr id="tr'+i+'" fillcolor="ffcc33" strokecolor="000000">';
	    html+="<td>";
	  
	    html+='<input type="checkbox" id="checkbox'+i+'" name="checkbox" value="'+i+'" checked="checked" onchange="overlayercheck('+i+')"  />';
	    html+='<img id="hover'+i+'"  src="images/hover.jpg" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" onmouseover="changestyleoverhover('+i+')"';
	    html+='onmouseout="changestyleouthover('+i+')""></img>';
	    html+='</td>';
	    
	    /////////------
	  
	     html+="<td style='min-width: 250px;'>";
	    html+=userConfig.overlayer[i].get("title");
	    html+="<br>";
	    var layer = findBy(ol2d.getLayerGroup(), userConfig.overlayer[i].get("title"));
	    html+= '<input class="opacity'+userConfig.overlayer[i].get("title")+'" style="display:block;" type="range" min="0" max="1" step="0.01" value="1" onchange="changeopacity('+i+')"/>';
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

	    /////////   
	     html+="</tr>";
	     //html+='<br />';

        //ol2d.addLayer(userConfig.overlayer[i]);

	      }
	      html+='</div>';
 
	      html+='</table>';
	      
	   }

	
	$('#overlayers').html(html); 
	
	
	 overlayerconficheck();
	
}//function configureOverlayers()



function overlayerconfig(){

   $(document).on('click','#overmapButton',function(event) {
   	
   	 if ($('#overlayers').css('display') == 'block')
          {
          toggleoverlayerPanel(false);
           }
	  else
	  {
	     toggleallpanel(false);
		 toggleoverlayerPanel(true);
      }  
   	
   	
	    
	});


}//function overlayerconfig()

function configurebaselayers()
{
	var html='<center><b>BASE LAYERS</b></center><a class="closer-icon" id="closer-icon" onclick="togglebaselayerPanel(false)">&times;</a><hr>';
	for (i = 0, ii = userConfig.baselayer.length; i < ii; ++i) {
	
	    html+='<input type="radio" id="'+userConfig.baselayer[i].get("title")+'" name="radio" value="'+i+'" checked="checked" onchange="baselayerchange('+i+')"/>'+userConfig.baselayer[i].get("title")+'<br />';
	 
	 
	
	 

	    }
     userConfig.baselayer[userConfig.baselayer.length-1].setVisible(true);
	 
	//$('#baselayer').html(html); 
	
	$('#baselayers').html(html); 
	
}
function baselayerconfig(){

   $(document).on('click','#basemapButton',function(event) {
   	
   	 if ($('#baselayers').css('display') == 'block')
          {
          togglebaselayerPanel(false);
           }
	  else
	  {
	     toggleallpanel(false);
		 togglebaselayerPanel(true);
      }  
   	
   	
	    
	});


}//function baselayerconfig()


function configurationfunctionmenu()
{
     configuration3DcityDBconnection();	

///removevector click button
   $(document).on('click','#removector',function(event) {
		removedragdroplayer();//mapfunction
    });

	///connect to database 3dcityDB
     $(document).on('click','#3dcitybd',function(event) {

	     ThreedcityDBConnect.dialog('open');
     });
     
     
     //////////////////////////////////
     
          $(document).on('click','#streetview',function(event) {

	     showstreetviewmesssage("<center>Activation of street view<br>Pick a point from map</center>","STREET VIEW");
     });
     
     
    ////////////////////////////////////////////////
    
         $(document).on('click','#sidebyside',function(event) {
	     sidebysideconnectfunction();
     });
     

 
  //request data from database 

    $(document).on('click','#3dcitybdadd',function(event){
	
	         $.post('phplib/requestdata.php?request=0',{},function(dbname){
		      //configurationoflayer3dcitydb(citydbname);
		      citydbname=dbname;
		      configuratrionconnecitonlayer();
		     
		      
		      connecitonlayer.dialog('open');
		      

	             });

       });
//3dcitybdaddogc
    $(document).on('click','#3dcitybdaddogc',function(event){
	
	        

		      //configuratrionconnecitonlayer();
		      
	var html='Add GeoServer Url:<br> <input id="geoserverurl" type="text">';
	html+='  <img id="geoserverurladd" onclick="addworkspace()" src="images/add16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="entry of url"><img><hr>';
	////////////////////////workspace//////////////////
	html+='Workspace:<br> ';
	html+='<select  id="selectedworkspace" style="cursor:pointer;width: 150px;" onchange="Geoserverchangevalueofworkspace(this)">';
    html+='<option value="Select">-</option>'; 
    html+='</select><br>'; 
    
    ////////////store/////////////////
	html+='Store:<br>';
		html+='<select  id="selectedstore" style="cursor:pointer;width: 150px;" onchange="Geoserverchangevalueofstore(this)">';
    html+='<option value="Select">-</option>'; 
    html+='</select><br>'; 
	html+='Layer:<br>';
	///////////////layer////////////////
	html+='<select  id="selectedlayer" style="cursor:pointer;width: 150px;"">';
    html+='<option value="Select">-</option>'; 
    html+='</select><hr>';
    //////////////////
	html+='Select OGC Service:';
	////////////////OGC -WMS, WFS
    html+='<select  id="selectedogc" style="cursor:pointer;width: 60px;"">';
    html+='<option value="WMS">WMS</option>'; 
    html+='<option value="WFS">WFS</option>'; 
    html+='</select>';	     
		     
		      connecitonlayerOGC.html(html);
		      connecitonlayerOGC.dialog('open');
		      

	           

       });


	
}//function configurationfunctionmenu()


//create the contains of connecitonlayer.dialog
function configuratrionconnecitonlayer(){
	  
	var html="<div id='databasename'>Your are connected to:<b> "+citydbname+"</b></div><hr>";
	html+='Preview all data:<button id="preview" class="mapButton" title="preview all data" onclick="configurationoflayer3dcitydb()"><img src="images/preview-5.png" style="WIDTH: 32px; HEIGHT: 32px"></img></button>';
	html += ' <button id="removectorcurrent" class="mapButton" title="remove layer" onclick="removelayerbycitydb()"><img src="images/remove16.png" style="WIDTH: 32px; HEIGHT: 32px"></img></button><hr>';
    html+='<span id="lodbuilding" >Data for every building: <select id="selectedlod" style="cursor:pointer;" onchange="checkandselectlod(this)"><option value="0">select lod</option><option value="2">lod2</option><option value="3">lod3</option><option value="4">lod4</option></select></span>';
	html+='  <button style="visibility:hidden" id="buttonpreview" class="mapButton" title="buildings" onclick="configurationofbuildings3dcitydb()"><img src="images/buildings.png" style="WIDTH: 32px; HEIGHT: 32px"></img></button>';
    html+='  <button style="visibility:hidden" id="buttonpreviewdetails" class="mapButton" title="buildings in detail" onclick="configurationofbuildingsdetail3dcitydb()"><img src="images/buildingsdetail.jpg" style="WIDTH: 32px; HEIGHT: 32px"></img></button>';
    html+='<div id="numberofbuidings" style="max-height: 170px; overflow-y: scroll; margin:auto; text-align:center;"></div>';

	connecitonlayer.html(html);

}//configuratrionconnecitonlayer()
//select lod and check if exist in database

/*

             	    getbuildings = JSON.parse(buildings[i]);
             	    buildingid=getbuildings.crs.properties.building;
             	    objectclassid=getbuildings.crs.properties.surfacetype_id;
             	    objectclassname=getbuildings.crs.properties.surfacename;

*/


//return the building with detail
function configurationofbuildingsdetail3dcitydb(){

    var html="<hr>";
    var thebuildingsid=[];
    var lod=$( "#selectedlod" ).val();
     $.post('phplib/requestdata.php?request=5',{lod:lod},function(buildingsid){
     	
     
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
             
              html+="<table style='margin:auto; text-align:center'>";
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


             $('#numberofbuidings').html(html);      

     });
    



}


//return the buildings
function configurationofbuildings3dcitydb(){
	

	var getbuilding;
	//var buildingid=[];
	var buildingid=[];
  
	
	var buildings=[];
	var lod=$( "#selectedlod" ).val();
	
	
	 $.post('phplib/requestdata.php?request=0',{},function(dbname){
      	    citydbname=dbname;
      	 });
	
	 $.post('phplib/requestdata.php?request=2',{lod:lod},function(dbbuilding){

           var parsed = JSON.parse(dbbuilding);
          

           for(var x in parsed){
                buildings.push(parsed[x]);
                
        	    getbuilding = JSON.parse(buildings[x]);
        	    buildingid.push(getbuilding.crs.properties.building);
                
                
              }
            var checking=false; 
            var checkname=citydbname+"_building_lod"+lod+"_"+buildingid[0];//only one no problem
            //alert(buildings.length);
            for(var i=0;i<userConfig.overlayer.length;i++)
      	    {
      	    	if(userConfig.overlayer[i].get("title")===checkname)
      	    	{
      	    		checking=true;
      	    		
      	    	}
      	    }
            
            
             for(var i=0;i<buildings.length;i++)
             {
             	if(checking==true)
             	{
             		var name=citydbname+"_building_lod"+lod+"_"+buildingid[i];
                    for(var j=0;j<userConfig.overlayer.length;j++)
      	               {
      	               	  if(userConfig.overlayer[j].get("title")==name)
      	    	             {
                            $("#tr"+j).css('display','block');
                           
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
                var features = geojsonFormat.readFeatures(buildings[i],
                   {featureProjection: 'EPSG:3857'});
                   vectorsource.addFeatures(features);
             
               

	           var json=new ol.layer.Vector({
                 title: citydbname+"_building_lod"+lod+"_"+buildingid[i],
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

//open dialog with layer of 3dcitydb
function configurationoflayer3dcitydb()
{      
      $.post('phplib/requestdata.php?request=0',{},function(dbname){
      	    citydbname=dbname;
      	    var checking=false;
      	  
      	    ///check if load again --problems in features when reloaded
         for(var i=0;i<userConfig.overlayer.length;i++)
      	    {
      	    	if(userConfig.overlayer[i].get("title")==citydbname)
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
           
              var vectorsource = new ol.source.Vector();
              $.ajax('phplib/requestdata.php?request=1').then(function(response) {
              	
              var geojsonFormat = new ol.format.GeoJSON();
              var features = geojsonFormat.readFeatures(response,
                   {featureProjection: 'EPSG:3857'});
                   vectorsource.addFeatures(features);
             
                    });   

	          var json=new ol.layer.Vector({
                 title: citydbname,
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
                      $('#data').append(html);
                     }
                     else
                     {
                     	$('#data').html(html);
                     }
              }  
            });

}//function configurationoflayer3dcitydb(data)


    
function configuration3DcityDBconnection()
{
var html="";
html+=' <div  class="sky-form">';
     	 	
html+='		     <header>New connection to 3DcityDB</header>';
html+='			 <fieldset>';

html+='					   <label class="label">SERVER (e.g local server: localhost)</label>';
html+='					   <label class="input">';
html+='						  <input type="text" id="server">';
html+='					   </label>';


html+='		   </fieldset>';
				
html+='	       <fieldset>';
html+='					<label class="label">PORT (e.g: 5432) </label>';
html+='					<label class="input">';
html+='					   <input type="text" id="port">';
                        
html+='				    </label>';
html+='          </fieldset>';
				
html+='          <fieldset>';					

html+='					<label class="label">DATABASE (Database name)</label>';
html+='					<label class="input">';
html+='					    <input type="text" id="database">';
html+='				    </label>';
html+='         </fieldset>';
html+='          <fieldset>';					

html+='					<label class="label">SCHEMA(e.g: citydb)</label>';
html+='					<label class="input">';
html+='					    <input type="text" id="schema">';
html+='				    </label>';
html+='         </fieldset>';
								
html+='        <fieldset>';
html+='                   <label class="label">USERNAME(e.g: postgres)</label>';
html+='                   <label class="input">';
html+='                        <input type="text" id="username">';
html+='                  </label>';
html+='        </fieldset>';
				
html+='        <fieldset>';
					
html+='                  <label class="label">PASSWORD</label>';
html+='                  <label class="input">';
html+='					    <input type="password" id="password">';
html+='				 </label>';	 
html+='	   </fieldset>';
html+='       <footer>';
html+='			  <center><button id="3dcitybdcheck" class="mapButton" title="check connection" onclick="checkconnectionbutton()"><img src="images/3dcitydb2.jpg" style="WIDTH: 32px; HEIGHT: 32px"></img>check connection</button>';
html+='	   <div id="result"></div></center></footer>';
html+='      </div>';

$('#ThreedcityDBConnect').html(html); 
	
	
}//function configuration3DcityDBconnection()

function checkconnectionbutton(){
	
	//alert("good");
	//$('#3dcitybdcheck').click(function(){
	
	    var server=$('#server').val();
	    var port=$('#port').val();
	    var database=$('#database').val();
	    var schema=$('#schema').val();
	    var username=$('#username').val();
	   var password=$('#password').val();

	   if(server==""||port==""||database==""||schema==""||username==""||password=="")
	     {
		
		  document.getElementById('result').innerHTML="<hr>ATTENTION !!! Not all the data filled";
		
	      }
	  else
	     {
	     	
	     	//alert("good");
	     	document.getElementById('result').innerHTML="";
		  $.post('phplib/dbcheck.php?link=1',{server:server,port:port,database:database,username:username,password:password},function(data){
		        
		        if(data!="connection failed")
		          {
			      if(data!="")
			         {
			         //document.getElementById('next').style.visibility="visible";
			         }
		          }
		
		        document.getElementById('result').innerHTML="<hr>"+data;
		        if( $('#databasename').length ) 
		        {
		        	 $.post('phplib/requestdata.php?request=0',{},function(dbname){
		             //configurationoflayer3dcitydb(citydbname);
		             citydbname=dbname;
		             configuratrionconnecitonlayer();
		     
		      
		      
		      

	             });
		        	
		        	
		        }
			
	     });
	
	
	    }
	
//});
	
}//function checkconnectionbutton()



function configurationmenu()
{
	var	html = ' <button id="3dcitybd" class="mapButton" title="connect to 3dcityDB"><img src="images/3dcitydb2.jpg" style="WIDTH: 32px; HEIGHT: 32px"></img>3DcityDB</button>'; 
	html += ' <button id="streetview" class="mapButton" title="street view"><img src="images/streetview.png" style="WIDTH: 32px; HEIGHT: 32px"></img>Street view</button>'; 
	html += ' <button id="sidebyside" class="mapButton" title="side by side view"><img src="images/2d3d.jpg" style="WIDTH: 32px; HEIGHT: 32px"></img></button>'; 



    var html1 = ' <button id="basemapButton" class="mapButton" title="choose Base Maps"><img src="images/basemaps.jpg" style="WIDTH: 32px; HEIGHT: 32px"></img> BASE MAPS</button>';
    html1 += '     <button id="overmapButton" class="mapButton" title="choose overlayer"><img src="images/legend/diafanies.png" style="WIDTH: 32px; HEIGHT: 32px"></img> OVERLAYERS</button>';
	$('#topMenuLeft').html(html);
	$('#topMenuRight').html(html1);
	
	
}//function configurationmenu()


function terrainconfig(){


$(document).on('click','#terrainButton',function(event) {
	 toggleallpanel(false);
	 toggleterrainsPanel(true);
		
	});
	

}//function terrainconfig()



function terrainprovider3D()
{
	  var html='<center><b>TERRAINS</b></center><a class="closer-icon" id="closer-icon" onclick="toggleterrainsPanel(false)">&times;</a><hr>';
	  
	  for (i = 0, ii = userConfig.terrainprovider.length; i < ii; ++i) {
	 	
	      html+='<input type="radio" id="'+terrainnames[i]+'" name="terrainprovider" value="'+i+'"  onchange="terrainchange('+i+')"  />'+ terrainnames[i]+'<br />';
	 
	 
	       }
	
	$('#terrains').html(html); 
	
	
}//terrainprovider3D()




function configuration3dtools()
{
	//remove drag and drop
	ol2d.removeInteraction(dragAndDropInteraction);
	ol2d.removeControl(spatialbutton); 
	
	//remove button for removelayer from drag and drop
	

	
	//3dview
	$('#topMenuCenter').html("3D view");
	ol2d.addControl(terrainbutton); 
	$("#queries").css('display','none');
	$("#sidebyside").css('visibility','hidden');
	
	
	
}//function configuration3dtools

function configuration2dtools()
{
	ol2d.addControl(spatialbutton); 
	//add drag and drop
	    ol2d.addInteraction(dragAndDropInteraction);
	//add button for removelayer from drag and drop
       //  var	html = ' <button id="3dcitybd" class="mapButton" title="connect to 3dcityDB"><img src="images/3dcitydb2.jpg" style="WIDTH: 32px; HEIGHT: 32px"></img>3DcityDB</button>'; 

	    // $('#topMenuLeft').html(html);
	     
	    //2D view
	     $('#topMenuCenter').html("2D view"); 
	     toggleterrainsPanel(false);
	     ol2d.removeControl(terrainbutton);
	     $("#sidebyside").css('visibility','visible');
	
	
}//function configuration2dtools
function configureUserInterface(){
	configureOverlayers();
    configurebaselayers();
    baselayerconfig();
    overlayerconfig();
    terrainprovider3D();
  //terrainconfig();
    configurationmenu();
    configurationfunctionmenu();
   // wfslayer();



}//function configureUserInterface()



