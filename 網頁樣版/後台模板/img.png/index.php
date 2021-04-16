<?PHP   
	session_start();
	$type = 'png';
	$width= 70;
	$height= 30;
	$randval = randStr(4,"NUMBER");
	$_SESSION['randcode'] = $randval;
	header("Content-type: image/".$type);
	srand((double)microtime()*1000000);
	
	if($type !='png' && function_exists('imagecreatetruecolor')){
		$im = imagecreatetruecolor($width,$height);
	}else{
		$im = imagecreate($width,$height);
	}

	$stringColor 	= ImageColorAllocate($im,22,22,190); //字體顏色
	$backColor 		= ImageColorAllocate($im,240,240,240);//背景色
	$borderColor 	= ImageColorAllocate($im,240,240,240);//邊框色
	$pointColor 	= ImageColorAllocate($im,22,22,190);//點顏色
	
	imagefilledrectangle($im, 0, 0, $width - 1, $height - 1, $backColor);//背景位置
	imagerectangle($im, 0, 0, $width-1, $height-1, $borderColor); //邊框位置
	//繪模糊作用的點
	for($i=0;$i < 200;$i++)
	{
		$pointX = rand(2,$width-2);
		$pointY = rand(2,$height-2);
		imagesetpixel($im, $pointX, $pointY, $pointColor);//繪模糊作用的點
	}
	
	//imagestring($im, 5, 6, 2, $randval, $stringColor); //調整字型位置

	//利用true type字型來產生圖片
	//語法: array ImageTTFText(int im, int size, int angle, int x, int y, int col, string fontfile, string text);
	//參數 size 為字形的尺寸；
	//angle 為字型的角度，順時針計算，0 度為水平，也就是三點鐘的方向 (由左到右)，90 度則為由下到上的文字；
	//x,y 二參數為文字的坐標值 (原點為左上角)；
	//參數 col 為字的顏色；
	//fontfile 為字型文件名稱，亦可是遠端的文件；
	//text 當然就是字符串內容了
	imagettftext($im, 18, rand(-10,10), 10, 25, $stringColor,"arial.ttf",$randval);
	$ImageFun='Image'.$type;
	$ImageFun($im);
	ImageDestroy($im);

	//產生隨機字符串
	function randStr($len = 6, $format = 'ALL') {
		switch($format) {
			case 'ALL':
			  $chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			break;
			case 'CHAR':
			  $chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			break;
			case 'NUMBER':
			  $chars='0123456789';
			break;
			default :
			  $chars='0123456789';
			break;
		}
		$string="";
		while(strlen($string) < $len)
		  $string .= substr($chars,(mt_rand()%strlen($chars)),1);
		return $string;
	}

?>