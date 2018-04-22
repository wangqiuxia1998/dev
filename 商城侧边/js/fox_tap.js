  //封装的js
    function fox_tap(element,callBack){
    /* 	绑定touch事件
   		计算start 和end的时间差
   			如果时间差很长
   		move就触发
 	*/
	// 开始的时间
		var startTime = 0;
		// 标示 是否触发了 move事件
		var isMove =false;
		// 定义 最大的 延迟时间
		var maxTime = 250;

		element.addEventListener('touchstart',function (e) {
			// 记录开始时间
			startTime = Date.now();

			// 修正 我们标示变量的值
			isMove = false;
		});
		element.addEventListener('touchmove',function (e) {
			// 修改标示变量
			isMove = true;
		});
		element.addEventListener('touchend',function (e) {
			if (isMove == true) {
				// console.log('失效');
				return;
			}
			// 判断 延迟延迟的时间
			if ((Date.now()-startTime)>maxTime) {
				return;
			}
			// console.log('成功');
			callBack(e);
	    });
 	};