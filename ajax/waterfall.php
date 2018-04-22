<?php 
	// 读取json文件  string
	$jsonStr = file_get_contents('info/data.json');
	// 转化为 php数组 array
	$totalArr = json_decode($jsonStr);
	
	// 从数组中 随机获取 10个值 返回的 是一个 随机key 数组
	$randomKeys = array_rand($totalArr,10);

	// print_r($randomKeys);

	// php中的数组 长度是可变的
	$newArr = array(); //长度为0

	// 使用 随机的key count(数组) 可以获取 php中数组的长度
	for ($i=0; $i <count($randomKeys) ; $i++) { 
		// 获取 索引数组中的 每一个key
		$key = $randomKeys[$i];
		// 使用 key 从 总数组中 获取 key对应的值 对象
		$obj = $totalArr[$key];

		$newArr[$i] = $obj;  
	}
	// print_r($newArr);
	
	// 转化为 json 
	echo json_encode($newArr);

 ?>