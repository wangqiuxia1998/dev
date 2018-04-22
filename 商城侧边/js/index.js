// 页面加载完毕
window.onload = function() {
    left_scroll();
    right_scroll();
}

//左边滑动效果
/*
	1.获取元素
		移动的ul
			获取header高度
			获取ul的高度
			获取屏幕的高度
			获取移动的最大值 和最小值
	2.通过touch事件进行滑动
	3.手指松开吸附回去
		touchend
*/
function left_scroll() {
    //1.获取元素及参数
    var moveUl = document.querySelector('.main_left ul');

    var headerHeight = document.querySelector('.header').offsetHeight;

    var ulHeight = document.querySelector('.main_left ul').offsetHeight;

    var screenHeight = window.screen.height;

    var maxDistance = 0;
    var minDistance = screenHeight - headerHeight - ulHeight;

    //用于定义变量来标识吸附的距离
    var delayDistance = 150;
    // console.log(ulHeight);
    // console.log(screenHeight);

    //2.获取touch事件 修改ul的值
    //起始值
    var startY = 0;
    //移动值
    var moveY = 0;
    //总的移动的距离
    var distanceY = 0;

    // console.log(startY);
    // console.log(moveY);
    // console.log(distanceY);

    //定义变量
    var startTransition = function() {
        moveUl.style.transition = 'all .3s';
    };

    var endTransition = function() {
        moveUl.style.transition = '';
    };

    var setTransform = function(distance) {
        moveUl.style.transform = 'translateY(' + distance + 'px)';
    };

    moveUl.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });
    moveUl.addEventListener('touchmove', function(event) {

        moveY = event.touches[0].clientY - startY;
        //判断是否满足移动条件
        if ((moveY + distanceY) > maxDistance + delayDistance) {
            moveY = 0;
            distanceY = maxDistance + delayDistance;
        } else if ((moveY + distanceY) < minDistance - delayDistance) {
            moveY = 0;
            distanceY = minDistance - delayDistance;
        }

        //关闭过渡
        endTransition();
        //移动
        setTransform(moveY + distanceY);

    });
    moveUl.addEventListener('touchend', function(event) {
        //修改移动的距离
        distanceY += moveY;
        // 吸附回去  判断吸附的方向
        if (distanceY > maxDistance) {
            distanceY = maxDistance;
        } else if (distanceY < minDistance) {
            distanceY = minDistance;
        }

        startTransition();

        setTransform(distanceY);
    });




    //第二部分 点击跳转
    /*
		获取触发dom事件的元素 改变current

		获取li标签*高度
		计算出需要transform的高度
		判断高度是否满足
		设置过渡 
		改变高度

    */

 	//获取元素
    var liHeight = document.querySelector('.main_left ul li').offsetHeight;
    // console.log(liHeight);

    var liArr = document.querySelectorAll('.main_left ul li');

    //js 绑定自定义属性
    for (var i = 0; i < liArr.length; i++) {
    	liArr[i].dataset['index']= i;
    }


    fox_tap(moveUl,function(e){
    	// console.log(e);
    	console.log(e.target.parentNode);

    	//修改当前的li的class
    	for (var i = 0; i < liArr.length; i++) {
    		liArr[i].className = ''; 
    	}
    	// 高亮当前的
    	e.target.parentNode.className = "current";

    	//获取当li的索引值
    	var currentIndex = e.target.parentNode.dataset['index'];

    	// 计算当前li的高度 需要移动的高度
    	var moveDistance = -currentIndex * liHeight;

    	if (moveDistance > maxDistance) {
    		moveDistance = maxDistance;
    	} else if(moveDistance < minDistance){
    		moveDistance = minDistance;
    	}

    	startTransition();

    	setTransform(moveDistance);

    });
}

function right_scroll(){
	var moveUl = document.querySelector('.main_right');

    var Height = document.querySelector('.main_right').offsetHeight;

    var screenHeight = window.screen.height;

    var maxDistance = 0;
    var minDistance = screenHeight - Height;

    //用于定义变量来标识吸附的距离
    var delayDistance = 150;
    // console.log(ulHeight);
    // console.log(screenHeight);

    //2.获取touch事件 修改ul的值
    //起始值
    var startY = 0;
    //移动值
    var moveY = 0;
    //总的移动的距离
    var distanceY = 0;

    // console.log(startY);
    // console.log(moveY);
    // console.log(distanceY);

    //定义变量
    var startTransition = function() {
        moveUl.style.transition = 'all .3s';
    };

    var endTransition = function() {
        moveUl.style.transition = '';
    };

    var setTransform = function(distance) {
        moveUl.style.transform = 'translateY(' + distance + 'px)';
    };

    moveUl.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });
    moveUl.addEventListener('touchmove', function(event) {

        moveY = event.touches[0].clientY - startY;
        //判断是否满足移动条件
        if ((moveY + distanceY) > maxDistance + delayDistance) {
            moveY = 0;
            distanceY = maxDistance + delayDistance;
        } else if ((moveY + distanceY) < minDistance - delayDistance) {
            moveY = 0;
            distanceY = minDistance - delayDistance;
        }

        //关闭过渡
        endTransition();
        //移动
        setTransform(moveY + distanceY);

    });
    moveUl.addEventListener('touchend', function(event) {
        //修改移动的距离
        distanceY += moveY;
        // 吸附回去  判断吸附的方向
        if (distanceY > maxDistance) {
            distanceY = maxDistance;
        } else if (distanceY < minDistance) {
            distanceY = minDistance;
        }

        startTransition();

        setTransform(distanceY);
    });

}