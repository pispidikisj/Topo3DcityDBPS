<?php

if (isset($_GET['link'])) 
{
	if($_GET['link']==1)//gia elenxo
	{
  
      $server=$_POST['server'];
      $port=$_POST['port'];
      $database=$_POST['database'];
      $username=$_POST['username'];
      $password=$_POST['password'];
      $dbconn3 = pg_connect("host=$server port=$port dbname=$database user=$username password=$password")or die('connection failed');
      if($dbconn3)
        {
	    $string= "<font color='black'>connection success</font>";
	    $fp=fopen('connect.php','w');
	    $data="<?php \n ";
	    $data=$data."$"."Server='".$server."';\n"."$"."Port=".$port.";\n"."$"."Database='".$database."';\n"."$"."Username='".$username."';\n"."$"."Password='".$password."';\n ?>";
	
    fwrite($fp, $data);
    fclose($fp);
	    echo $string;
	 }
	
	}
}//proti if
?>