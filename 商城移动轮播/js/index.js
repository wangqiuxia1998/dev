// 加载完毕事件 
window.onload = function() {
    //滚动效果
    headerScroll();

    //倒计时的效果
    cutDownTime();

    // 轮播图的效果
    banner();

}

// 通栏的效果
/*	1、获取元素jd_nav
	2、获取导航栏及通栏的高度
	3、获取页面滚动的高度 绑定onscroll事件 scrollTop
		注意：document.documentElement.scrollTop;
	*/


function headerScroll() {

    // 获取导航栏
    var navDom = document.querySelector('.jd_nav');

    //获取导航栏到顶部的距离
    var maxDistance = navDom.offsetTop + navDom.offsetHeight;

    //获取顶部的通栏
    var headerDom = document.querySelector('.jd_header');

    // 通过js修改行内式，设置rgba a为0 透明
    headerDom.style.backgroundColor = 'rgba(201,21,35,0)';

    window.onscroll = function() {
        // console.log('123');
        // 获取滚动的距离
        var scrollDistance = window.document.documentElement.scrollTop;
        // console.log(scrollDistance);
        // 计算出0-1的百分数
        var percent = scrollDistance / maxDistance;

        //如果超过1 就没有意义
        if (percent > 1) {
            percent = 1;
        }
        // 设置顶部通栏的样式的透明度；

        headerDom.style.backgroundColor = 'rgba(201,21,35,' + percent + ')';

    }
}


//倒计时方法
/*1. 获取导航栏的元素
2. 定义计时器时间总

3. 开启定时器：
判断时间还有没有
递减时间
修改退位的时间的li标签的数字innerHTML*/

function cutDownTime() {
    // 可以传入 css,css3 中的选择器
    var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
    //定义总时间先写hours 再写seconds
    var totalHour = 3;
    var totalSec = 3 * 60 * 60;
    //为了让用户看到时间是从03:00:00开始 sec++
    totalSec++;

    // 开启定时器
    var timer = setInterval(function() {

        if (totalSec < 0) {
            clearInterval(timer);
            console.log('活动结束了');
            return;
        }
        totalSec--;

        var hour = Math.floor(totalSec / 60 / 60);
        var mintue = Math.floor(totalSec % (60 * 60) / 60);
        var sec = totalSec % 60;

        //将小时显示在li标签中；
        // 小时，分，秒
        liArr[0].innerHTML = Math.floor(hour / 10);
        liArr[1].innerHTML = hour % 10;
        liArr[3].innerHTML = Math.floor(mintue / 10);
        liArr[4].innerHTML = mintue % 10;
        liArr[6].innerHTML = Math.floor(sec / 10);
        liArr[7].innerHTML = sec % 10;

    }, 1000);

}

//轮播图方法
/*
	获取元素 及相关
	1.开启定时器 
		index++;
		判断是否越界 并修改ul位置
		真实第一张的索引是1  即让轮播图的位置向左移动一个index宽度
	
	2.下方li标签修改外观
		当前索引使用的是.current  
		先清空所有的li的class ‘’
		然后为当前的li添加current
	
	3.动画效果的实现 transition
		.style.transition = 'all 0.3s'
		获取的时候添加动画

	4.当切换到最后一张转换到第一张的时候
		需要关闭过度
		实现瞬间切换

	5.对代码 重构 过渡结束(由于第二遍轮播的时候动画消失)
		定时器逻辑
			index++;

			修改 ul的 位置 ->开始过渡

		过渡结束事件逻辑 (监听)
			判断 index是否有效
				进行修正
			修改索引li标签的 显示

	6.使用touch事件，实现手指对ul的滑动
		tuochstart
			记录开始值
			关闭定时器
			关闭过度动画
		touchmove
			计算移动值
			修改ul的位置 (没有过渡效果)
		touchend
			记录移动的距离
			判断（吸附）
			开启定时器（*）
*/
function banner() {
    //获取元素
    //获取轮播图ul
    var moveUl = document.querySelector('.banner_images');

    //获取索引li的
    var indexLiArr = document.querySelectorAll('.banner_index li');

    //屏幕宽度
    var width = document.body.offsetWidth;

    //添加动画
    // moveUl.style.transition = 'all .3s';

    var index = 1;



    // 抽取代码
    //开启过度
    //考虑兼容webkitTranstion
    var startTransition = function(){
   		moveUl.style.transition = 'all .3s';
	};
	//关闭过渡
	var endTransition = function(){
		 moveUl.style.transition = '';
	};

	// 移动的距离 无法确定 提供参数
	var setTransform = function(distance){
		 moveUl.style.transform = 'translateX(' + distance + 'px)';
	}




    //开启定时器
    var timer = setInterval(function() {

        index++;

        //开启定时器是添加动画
        // moveUl.style.transition = 'all .3s';
      	startTransition();


        // //判断越界
        // if (index>8) {
        // 	index = 1;

        // 	//关闭过度
        // 	moveUl.style.transition = '';
        // }

        //修改ul的位置	
        // moveUl.style.transform = 'translateX(' + index * width * -1 + 'px)';
        setTransform(-index * width);

        // //修改li的外观
        // for (var i = 0; i < indexLiArr.length; i++) {
        // 	indexLiArr[i].className = '';
        // }

        // indexLiArr[index - 1].className = 'current';

    }, 2000);


    moveUl.addEventListener('webkitTransitionEnd', function() {
        //判断越界
        if (index > 8) {
            index = 1;

            //关闭过度
            // moveUl.style.transition = '';

            endTransition();

            //修改ul的位置	
            // moveUl.style.transform = 'translateX(' + index * width * -1 + 'px)';
            setTransform(-index * width)
        }
        //修改li的外观
        for (var i = 0; i < indexLiArr.length; i++) {
            indexLiArr[i].className = '';
        }

        indexLiArr[index - 1].className = 'current';

    });


    //注册 三个 touch 事件

    //定义变量
    //记录开始值
    var startX = 0;

    //记录移动的距离
    var moveX = 0;

    var  maxDistance = width / 3;

    //触摸开始
    moveUl.addEventListener('touchstart', function(event) {

        // 	关闭定时器
        clearInterval(timer);
        // 	关闭过度动画
        // moveUl.style.transition = '';
        endTransition();
        // 记录开始值
        startX = event.touches[0].clientX;
        // console.log(startX); 

    });

    //触摸中
    moveUl.addEventListener('touchmove', function(event) {

        // 	计算移动的距离
     	moveX = event.touches[0].clientX - startX;
        // console.log(moveX);

        // 	修改ul的位置 
        // moveUl.style.transform = 'translateX(' + (moveX + -index * width) + 'px)';
        setTransform(moveX - index * width);
    });

    //触摸结束
    moveUl.addEventListener('touchend', function(event) {

        // 	记录移动的距离	定义最大的偏移值
    
        // console.log(moveX);
        // 	判断（吸附）
        if (Math.abs(moveX) > maxDistance) {
            //判断左右移动
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }

            //开启过渡 并吸附一整页
            // moveUl.style.transition = 'all .3s';
            startTransition();
            // moveUl.style.transform = 'translateX(' + (-index * width) + 'px)';
            setTransform(-index * width);

        } else {
            // moveUl.style.transition = 'all .3s';
            startTransition();
            // moveUl.style.transform = 'translateX(' + (-index * width) + 'px)';
            setTransform(-index * width);
        }
        // 	开启定时器（*）
        timer = setInterval(function() {
            index++;
            // moveUl.style.transition = 'all .3s';
            startTransition();
            // moveUl.style.transform = 'translateX(' + (-index * width) + 'px)';
            setTransform(-index * width);
        }, 2000);
    })

}