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




function addselectedquery(i)
{    if(i>0)
	  {
	  	
	  	document.getElementById('conditionaddbutton'+(i-1)).style.display="none";
	  	
	  }
	
	var html='<select id="selectedattributes'+i+'"  onchange="putavailablevalue(this,'+i+')" style="cursor:pointer;">'; 
	     html+='<option value="select">select value</option>';
	    html+='<option value="class">class</option>';
	    html+='<option value="class_codespace">class codespace</option>';
 	    html+='<option value="function">function</option>';
	    html+='<option value="function_codespace">function codespace</option>';
	    html+='<option value="usage">usage</option>';
	    html+='<option value="usage_codespace">usage codespace</option>';
 	    html+='<option value="year_of_construction">year of construction</option>';
	    html+='<option value="roof_type">roof type</option>';
	    html+='<option value="roof_type_codespace">roof type codespace</option>';	
	    html+='<option value="measured_height">measured height</option>';
	html+='</select>  ';	
    html+='<select id="selectedequals'+i+'" style="cursor:pointer;">'; 
 	    html+='<option value=">">></option>';
	    html+='<option value=">=">>=</option>';
	    html+='<option value="<"><</option>';
 	    html+='<option value="<="><=</option>';
	    html+='<option value="=">=</option>';
	html+='</select>  ';
	html+='<select id="selectedvalues'+i+'" style="cursor:pointer;">';	
	//html+='<input type=text style="max-width:85px"><br>';
	html+='<option value="0">-</option>';
	html+='</select>  ';
	html+='<select id="andorselected'+i+'"  style="cursor:pointer;">'; 
 	    html+='<option value="and">and</option>';
	    html+='<option value="or">or</option>';
	html+='</select>  ';
	html+='  <img id="conditionaddbutton'+i+'"  onclick="addselectedquery('+(i+1)+')" src="images/add16.png" style="WIDTH: 12px; HEIGHT: 12px; cursor:pointer" title="Add new condition"></img><br>';
 	
	//var data=$('#querydiv').html();
	$('#querydiv').append(html); 
	$('#numberquery').html(i); 
	
	
}

function putavailablevalue(sel,id)
{
	//alert(sel.value);
$.post('phplib/requestdata.php?request=15',{value:sel.value},function(result){	


	var parsed = JSON.parse(result);
    if(parsed==0)
	{ $('#selectedvalues'+id).html('<option value="0">-</option>'); 
		//alert("no data");
	}
	else{
   // alert(parsed);
   $('#selectedvalues'+id).html('<option value="0">-</option>'); 
    for(var x in parsed){
    	var data=$('#selectedvalues'+id).html(); 
    	$('#selectedvalues'+id).html(data+'<option value="'+parsed[x]+'">'+parsed[x]+'</option>'); 
    	
        }
    
       }
   });
	
	
	
}
function querybox()
{
	$('#querydiv').html("");
	$('#querydiv').html('<div id="numberquery" style="display:none;">0</div><div>Select lod: <select id="selectedlodquery" style="cursor:pointer;" onchange="checkselectlodquery(this)"><option value="0">select lod</option><option value="2">lod2</option><option value="3">lod3</option><option value="4">lod4</option></select></div><div id="clearquery">Select building where:<div style="text-align: right; cursor:pointer; background: #C2B1B1;"><img onclick="clearqueries()" src="images/remove16.png" style="WIDTH: 12px; HEIGHT: 12px"></div></div><hr>'); 

	var data=$('#querydiv').html();
	addselectedquery(0);

	buidingquery.dialog("open");
}

function clearqueries(){
	
	querybox();

}

function checkselectlodquery(sel)
{       
     var lod=$( "#selectedlodquery" ).val();
		 $.post('phplib/requestdata.php?request=3',{lod:sel.value},function(result){
      	   
      	    if(result!=="0")
      	     {
      	     	
      	     }
      	     else{
      	     	//document.getElementById("querydiv").style.display='none';
      	     	messagealert("No surface data in lod"+sel.value,"ATTETION!");
      	     	
      	     }
      	 });

}
function executequery()
{
      
	
	//selectedattributes ,selectedequal, selectedvalues, andorselected
	var number=$('#numberquery').html();

	var html="";
	for(var i=0;i<=number;i++)
	{ 
		var attr=$('#selectedattributes'+i).val();
		var equal=$('#selectedequals'+i).val();
		var andor=$('#andorselected'+i).val();
		var val=$('#selectedvalues'+i).val();

		if(i==number)
		{
			html+=" "+attr+" "+equal+" '"+val+"' ";
			
		}
        else
        {
        	
        	html+=" "+attr+" "+equal+" '"+val+"' "+andor+" ";
   	
        }

	}
	
	

$.post('phplib/requestdata.php?request=16',{whereclause:html},function(result){	
	    	 var lod=$( "#selectedlodquery" ).val();
	    	 
	    if(lod==0)
	    {
	    	
	    	messagealert("You dont select lod","ATTETION!");
	    	
	    }
	    else
	    {	 
	 
		var parsed = JSON.parse(result);
         if(parsed==0)
	      { 

		messagealert("No data","ATTENTION!");
	      }
	     else
	     {

             for(var x in parsed){
             
                	//alert(thelod);
             	    addnewoverlayerforbuildingdetail(parsed[x],lod);
             	
                //  } 
                     //alert(parsed[x]); 
                     
    	
              }
    
       }
	
	}
	
	});	

}

