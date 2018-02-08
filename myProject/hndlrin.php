<?PHP
	header('Access-Control-Allow-Origin: *');
	var_dump($_POST['data']);
	$data_out=$_POST['data'];
	$js_data_out=json_decode($data_out);
	
	$data_in=file_get_contents('serial.dat');
	$js_data_in=json_decode($data_in);
	
	$js_new=array_merge($js_data_in,$js_data_out);
	$new=json_encode($js_new);
	
	$file="serial.dat";
	$fp = fopen($file, "w");
	fwrite($fp, $new);
	fclose ($fp);
?>
