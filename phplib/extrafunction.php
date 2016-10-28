<?php

class extrafunctionWrapper {
var  $Server='';
var  $Port=0;
var  $Database='';
var  $Username='';
var  $Password='';
var $Schema='';

// Internal stuff
	public function __construct($Server, $Port= 0,$Schema='', $Database = '' ,$Username='' ,$Password='') {
		
		$this->Server = $Server;
		$this->Port= $Port;
		$this->Schema = $Schema;
		$this->Database = $Database;
		$this->Username = $Username;
		$this->Password = $Password;
	}
	
	

//get list of data base the field	
public function getdatainformation($value)
	{
	    $dbconn3 = pg_connect("host=$this->Server port=$this->Port dbname=$this->Database user=$this->Username password=$this->Password ")or die('connection failed');	
		$sql='SELECT DISTINCT '.$value.' FROM building order by '.$value;
		$result=pg_query($dbconn3, $sql);
		$mydata;	  
	    $i=0;
        while ($row = pg_fetch_row($result))
               {

                $mydata[$i]=$row[0];
				//$gsondata.=$mydata[$i];
				$i++;
	           } 	
			   
	 return $mydata;
	
	
	}
	
	
}
	
	
	
	
	
	
	
?>	